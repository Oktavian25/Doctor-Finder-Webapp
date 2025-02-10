using Azure.Core.Pipeline;

namespace backend;

public class Doctor
{
    public int Id{get;set;}
    public string? Name{get;set;} 
    public int Age{get;set;} 
    public string? Location{get;set;}
    public string? Image{get;set;}
    public string? Specialization{get;set;} 
    public int SpecializationId{get;set;} 
    public string? Clinic{get;set;} 
    public int ClinicId{get;set;} 
    public string? Description {get;set;}
    public int Rating {get;set;}
    public int numOfReviews{get;set;}

}

