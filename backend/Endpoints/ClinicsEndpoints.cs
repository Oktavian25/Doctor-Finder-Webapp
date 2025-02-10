using Microsoft.EntityFrameworkCore;

namespace backend;

public static class ClinicsEndpoints
{
	public static RouteGroupBuilder ClinicsMapGroup(this WebApplication app) {
		var group = app.MapGroup("/clinics");

		group.MapGet("/", (DoctorFinderContext dbContext) => {
			var clinics = dbContext.Clinics.Select(clinic => clinic).AsNoTracking();
			return Results.Ok(clinics);
		});

		group.MapGet("/{id}", (int id, DoctorFinderContext dbContext) => {
			var clinic = dbContext.Clinics.Find(id);

			if (clinic is null) {
				return Results.NotFound();
			}

			return Results.Ok(clinic);
		}).WithName("GetClinic");

		group.MapPost("/", (ClinicDto newClinic, DoctorFinderContext dbContext) => {
			ClinicEntity clinic = new ClinicEntity {
				Name = newClinic.Name,
			};
			dbContext.Clinics.Add(clinic);
			dbContext.SaveChanges();

			return Results.CreatedAtRoute("GetClinic", new { id = clinic.Id }, clinic);
		});

        group.MapPut("/{id}", (int id, ClinicDto newClinic, DoctorFinderContext dbContext) => {
            ClinicEntity? clinic = dbContext.Clinics.Find(id);

            if(clinic is null){
                return Results.NotFound();
            }

            clinic!.Name = newClinic.Name;

            dbContext.SaveChanges();
            return Results.NoContent();
        });

        group.MapDelete("/{id}", (int id, DoctorFinderContext dbContext) => {
            dbContext.Clinics.Where(clinic => id == clinic.Id).ExecuteDelete();
            return Results.NoContent();
        });
		

        return group;
    } 
}