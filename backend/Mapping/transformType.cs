using backend.Models;

namespace backend;


public static class transformType
{
    public static Review toDisplay(this ReviewEntity review,DoctorFinderContext dbContext){
        
        UserEntity? sender = dbContext.Users.Find(review.SenderId);
        DoctorEntity? receiver = dbContext.Doctors.Find(review.ReceiverId);

        Review toDisplayReview = new Review{
            Id=review.Id,
            SenderId = review.SenderId,
            ReceiverId = review.ReceiverId,
            Sender=sender?.Username,
            Receiver=receiver?.Name,
            ReviewMessage=review.Review,
            Rating = review.Rating
        };

        return toDisplayReview;
    }
    // Tranform Doctors from here
    public static Doctor toDisplay(this DoctorEntity doctor)
    {
        Doctor toDisplayDoctor = new Doctor{
            Id = doctor.Id,
            Name=doctor.Name,
            Age=doctor.Age,
            Location = doctor.Location,
            Image=doctor.Image,
            Specialization=doctor.Specialization.Name,
            SpecializationId=doctor.Specialization.Id,
            Clinic=doctor.Clinic.Name,
            ClinicId=doctor.Clinic.Id,
            Description = doctor.Description,
            Rating = doctor.Rating,
            numOfReviews = doctor.numOfReviews
        };
        return toDisplayDoctor;
    }
    public static DoctorEntity toEntity(this DoctorDto doctor,DoctorFinderContext dbContext){
        SpecializationEntity? specializationObj = dbContext.Specializations.Find(doctor.Id);
        ClinicEntity? clinicObj = dbContext.Clinics.Find(doctor.Id);
        DoctorEntity doctorEntity = new DoctorEntity{
            Id = doctor.Id,
            Name=doctor.Name,
            Age=doctor.Age,
            Location = doctor.Location,
            Image = doctor.Image,
            Specialization = specializationObj!,
            Clinic = clinicObj!,
            Description = doctor.Description,
            Rating = doctor.Rating,
            numOfReviews = doctor.numOfReviews
        };
        return doctorEntity;
    }
    public static DoctorEntity toEntity(this UpdateDoctorDto doctor,int id,DoctorFinderContext dbContext){
        
        SpecializationEntity? specializationEntity = dbContext.Specializations.Find(doctor.SpecializationId);
        ClinicEntity? clinicEntity = dbContext.Clinics.Find(doctor.ClinicId);
        DoctorEntity? oldDoctorEntity = dbContext.Doctors.Find(id);

        DoctorEntity doctorEntity = new DoctorEntity{
            Id=id,
            Name=doctor.Name,
            Age=doctor.Age,
            Location = doctor.Location,
            Image = doctor.Image,
            Specialization = specializationEntity!,
            Clinic = clinicEntity!,
            Description = doctor.Description,
            Rating = oldDoctorEntity!.Rating,
            numOfReviews = oldDoctorEntity!.numOfReviews,
        };
        return doctorEntity;
    }
    
}
