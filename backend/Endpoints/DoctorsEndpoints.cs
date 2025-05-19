using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
namespace backend;

public static class DoctorsEndpoints
{
    public static RouteGroupBuilder DoctorsMapGroup(this WebApplication app)
    {
        var group = app.MapGroup("/doctors");
        
        group.MapGet("/", (DoctorFinderContext dbContext) => {
            var doctors = dbContext.Doctors
                .Include(doctor => doctor.Specialization)
                .Include(doctor => doctor.Clinic)
                .Select(doctor => doctor)
                .AsNoTracking();

            var toDisplayDoctors = doctors.Select(doctor => doctor.toDisplay()).ToList();
            return Results.Ok(toDisplayDoctors);
        });

        group.MapGet("/{id}", (int id, DoctorFinderContext dbContext) => {
            var doctor = dbContext.Doctors
                .Include(doctor => doctor.Specialization)
                .Include(doctor => doctor.Clinic)
                .FirstOrDefault(doctor => doctor.Id == id);

            if (doctor is null)
            {
                return Results.NotFound(); 
            }

            return Results.Ok(doctor.toDisplay());
        }).WithName("GetDoctor");

        group.MapPost("/", [Authorize(Roles = "clinic")](CreateDoctorDto newDoctor, DoctorFinderContext dbContext) =>
        {
            var clinic = dbContext.Clinics.FirstOrDefault(c => c.Id == newDoctor.ClinicId);
            if (clinic == null) return Results.NotFound("Clinic not found.");

            var specialization = dbContext.Specializations.Find(newDoctor.SpecializationId);
            if (specialization == null) return Results.NotFound("Specialization not found.");

            DoctorEntity doctor = new()
            {
                Name = newDoctor.Name,
                Age = newDoctor.Age,
                Location = newDoctor.Location,
                Image = newDoctor.Image,
                Specialization = specialization,
                Clinic = clinic,
                Description = newDoctor.Description,
                Rating = 0,
                numOfReviews = 0,
                PhoneNumber = newDoctor.PhoneNumber,
                Email = newDoctor.Email
            };

            dbContext.Doctors.Add(doctor);

            dbContext.SaveChanges();

            return Results.CreatedAtRoute("GetDoctor", new { id = doctor.Id }, doctor.toDisplay());
        }).WithParameterValidation();

        group.MapPut("/{id}", [Authorize(Roles = "clinic")](int id,HttpContext httpContext, UpdateDoctorDto updatedDoctor, DoctorFinderContext dbContext) => {
            var username = httpContext.User.Identity?.Name;

            var existingDoctor = dbContext.Doctors
                .Include(d => d.Specialization)
                .Include(d => d.Clinic)
                .FirstOrDefault(d => d.Id == id);
            
            if (existingDoctor is null)
            {
                return Results.NotFound();
            }

            if(existingDoctor?.Clinic.Name != username){
                return Results.BadRequest("Could not modify doctor");
            }        

            if(existingDoctor?.ClinicId != updatedDoctor.ClinicId){
                return Results.BadRequest("You can't modify a doctor's clinic");
            }

            var updatedEntity = updatedDoctor.toEntity(id, dbContext);

            existingDoctor!.Name = updatedEntity.Name;
            existingDoctor.Age = updatedEntity.Age;
            existingDoctor.Location = updatedDoctor.Location;
            existingDoctor.Image = updatedDoctor.Image;
            existingDoctor.Specialization = updatedEntity.Specialization;
            existingDoctor.Clinic = updatedEntity.Clinic;
            existingDoctor.Description = updatedDoctor.Description;
            existingDoctor.PhoneNumber = updatedDoctor.PhoneNumber;
            existingDoctor.Email = updatedDoctor.Email;

            dbContext.SaveChanges();

            return Results.NoContent();
        }).WithParameterValidation();

        group.MapDelete("/{id}", [Authorize(Roles = "clinic")](int id, HttpContext httpContext, DoctorFinderContext dbContext) => {
            var username = httpContext.User.Identity?.Name;

            DoctorEntity? doctor = dbContext.Doctors.Include(d => d.Clinic).FirstOrDefault(d => d.Id == id);            

            if (doctor == null)
            {
            return Results.NotFound("Doctor not found.");
            }

            if (doctor.Clinic.Name != username)
            {
            return Results.BadRequest("Could not delete doctor");
            }

            var reviewsToDelete = dbContext.Reviews.Where(review => review.ReceiverId == doctor.Id);
            
            dbContext.Reviews.RemoveRange(reviewsToDelete);
            dbContext.Doctors.Remove(doctor);

            dbContext.SaveChanges();

            return Results.NoContent();
        });

        return group;
    }
}
