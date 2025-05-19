using System.ComponentModel.DataAnnotations;

public record SpecializationDto(
    [Required]string Name
);

public record ClinicDto(
    [Required][StringLength(40)]string Name
);
public record templateDoctorDto(
    [Required][StringLength(40)]string Name, 
    [Required][Range(20,100)]int Age,
    [Required]string Location,
    [Required]string Image,
    [Required]string Specialization,
    [Required]string Clinic,
    [Required]string Description,
    [Required][Range(1,5)]int Rating,
    [Required]int numOfReviews,
    [Required]string PhoneNumber,
    [Required]string Email
);
public record CreateDoctorDto(
    [Required][StringLength(40)]string Name, 
    [Required][Range(20,100)]int Age,
    [Required]string Location,
    [Required]string Image,
    [Required]int SpecializationId,
    [Required]int ClinicId,
    [Required]string Description,
    [Required][Range(1,5)]int Rating,
    [Required]int numOfReviews,
    [Required]string PhoneNumber,
    [Required]string Email
);
public record UpdateDoctorDto(
    [StringLength(40)]string Name, 
    [Range(20,100)]int Age,
    string Location,
    string Image,
    int SpecializationId,
    int ClinicId,
    string Description,
    int Rating,
    int numOfReviews,
    string PhoneNumber,
    string Email
);
public record DoctorDto(
    int Id,
    [Required][StringLength(40)]string Name, 
    [Required][Range(20,100)]int Age,
    [Required]string Location,
    [Required]string Image,
    SpecializationDto Specialization, 
    ClinicDto Clinic,
    [Required]string Description,
    [Required][Range(1,5)]int Rating,
    [Required]int numOfReviews,
    [Required]string PhoneNumber,
    [Required]string Email
);

public record UserDto(
    [Required][StringLength(40)]string Username,
    [Required][EmailAddress]string Email,
    string ImageUrl,
    string Role,
    [Required][MinLength(8)] string Password
);
public record LoginDto(
    [Required][EmailAddress] string Email,
    [Required][MinLength(8)] string Password
);

public record ReviewDto(
    [Required] int SenderId,
    [Required] int ReceiverId,
    [Required] string Review,
    [Required][Range(1,5)] int Rating 
);