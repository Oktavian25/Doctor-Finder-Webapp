namespace backend;

public class DoctorEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int Age { get; set; }
    public required string Location{get;set;}
    public required string Image{get;set;}
    public int ClinicId { get; set; }
    public int SpecializationId { get; set; }
    public required ClinicEntity Clinic { get; set; }
    public required SpecializationEntity Specialization { get; set; }
    public required string Description {get;set;}
    public required int Rating{get;set;} 
    public required int numOfReviews{get;set;}
}
