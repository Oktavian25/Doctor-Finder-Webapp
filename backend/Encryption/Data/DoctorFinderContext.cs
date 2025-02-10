using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

namespace backend;

public class DoctorFinderContext(DbContextOptions<DoctorFinderContext> options) : DbContext(options)
{
    public DbSet<DoctorEntity> Doctors => Set<DoctorEntity>();
    public DbSet<SpecializationEntity> Specializations => Set<SpecializationEntity>();
    public DbSet<ClinicEntity> Clinics => Set<ClinicEntity>();
    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<ReviewEntity> Reviews => Set<ReviewEntity>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SpecializationEntity>().HasData(
            new { Id = 1, Name = "ORL" },
            new { Id = 2, Name = "Neurologie" },
            new { Id = 3, Name = "Oncologie" },
            new { Id = 4, Name = "Pediatrie" },
            new { Id = 5, Name = "Chirurgie" }
        );
        modelBuilder.Entity<ClinicEntity>().HasData(
            new { Id = 1, Name = "Clinica Regina Maria" },
            new { Id = 2, Name = "MedLife" },
            new { Id = 3, Name = "Sanador" },
            new { Id = 4, Name = "Clinica Polisano" },
            new { Id = 5, Name = "Medicover" } 
        );
    }
}
