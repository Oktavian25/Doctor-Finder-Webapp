using Microsoft.EntityFrameworkCore;

namespace backend;

public static class SpecializationsEndpoints
{
    public static RouteGroupBuilder SpecializationsMapGroup(this WebApplication app){
        var group = app.MapGroup("/specializations");

        group.MapGet("/",(DoctorFinderContext dbContext)=>{
            var specializations = dbContext.Specializations.Select(spec=>spec).AsNoTracking();
            return Results.Ok(specializations);
        });
        
        group.MapGet("/{id}",(int id,DoctorFinderContext dbContext)=>{
            var specialization = dbContext.Specializations.Find(id);

            if(specialization is null){
                return Results.NotFound();
            }

            return Results.Ok(specialization);
        }).WithName("GetSpecialization");

        group.MapPost("/",(SpecializationDto newSpecialization, DoctorFinderContext dbContext)=>{
            SpecializationEntity specialization = new SpecializationEntity{
                Name=  newSpecialization.Name,
            };
            dbContext.Specializations.Add(specialization);
            dbContext.SaveChanges();

            return Results.CreatedAtRoute("GetSpecialization", new { id = specialization.Id }, specialization);
        });

        group.MapPut("/{id}",(int id, SpecializationDto newSpecialization, DoctorFinderContext dbContext)=>{
            SpecializationEntity? specialization = dbContext.Specializations.Find(id);
            specialization!.Name = newSpecialization.Name;

            dbContext.SaveChanges();
            return Results.NoContent();
        });

        group.MapDelete("/{id}",(int id,DoctorFinderContext dbContext)=>{
            dbContext.Specializations.Where(spec => id == spec.Id).ExecuteDelete();
            return Results.NoContent();
        });

        return group;
    } 
}
