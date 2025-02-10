using System.Security.Cryptography.X509Certificates;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace backend;
public static class UsersEndpoints
{
    public static RouteGroupBuilder UsersMapGroup(this WebApplication app)
    {
        var group = app.MapGroup("/users");

        // This is just for development REMOVE before release
        group.MapGet("/", (DoctorFinderContext dbContext) =>
        {
            var users = dbContext.Users.Select(user => user).AsNoTracking().ToList();
            return Results.Ok(users);
        });
        
        group.MapGet("/{id}", (int id, DoctorFinderContext dbContext) =>
        {
            var user = dbContext.Users.FirstOrDefault(user => user.Id == id);
            return Results.Ok(user);
        }).WithName("GetUser");
        
        group.MapPut("/{id}", [Authorize](int id, UserDto modifiedUser, DoctorFinderContext dbContext) =>
        {
            // Retrieve the user based on id
            var user = dbContext.Users.FirstOrDefault(user => user.Id == id);

            // If user is not found, return NotFound response
            if (user == null)
            {
                return Results.NotFound("User not found.");
            }

            // If the email and name is the same as before, return BadRequest
            if (user.Email == modifiedUser.Email && user.Username == modifiedUser.Username && user.ImageUrl == modifiedUser.ImageUrl)
            {
                return Results.BadRequest("Data cannot be the same");
            }

            if(user.ImageUrl != modifiedUser.ImageUrl){
                user.ImageUrl = modifiedUser.ImageUrl;
            }
            if(user.Email != modifiedUser.Email){
                user.Email = modifiedUser.Email;
            }
            if(user.Username != modifiedUser.Username){
                user.Username = modifiedUser.Username;
            }
            
            
            dbContext.SaveChanges();
            // Return success response
            return Results.Ok("User updated successfully.");
        }).WithParameterValidation();

        group.MapPost("/register", (UserDto newUser, DoctorFinderContext dbContext) =>
        {
            var normalizedEmail = newUser.Email.ToLower();
            var normalizedUsername = newUser.Username.ToLower();
            var isEmail = dbContext.Users.FirstOrDefault(user => user.Email!.ToLower() == normalizedEmail);
            var isUsername = dbContext.Users.FirstOrDefault(user => user.Username!.ToLower() == normalizedUsername);
            string validatedRole = newUser.Role;

            if (isEmail != null)
            {
                return Results.BadRequest("Email already exists");
            }
            if(isUsername != null){
                return Results.BadRequest("Username already exists");
            }

            if(string.IsNullOrEmpty(newUser.Role))
            {
                validatedRole = "user";
            }

            if(validatedRole != "user" && validatedRole !="clinic")
            {
                return Results.BadRequest("Role must be 'user' or 'clinic' ");
            }

            string hashedPassword = Encryption.HashPassword(newUser.Password, out string salt);

            UserEntity user = new()
            {
                Username = newUser.Username,
                Email = newUser.Email,
                ImageUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                Role = validatedRole,
                Password = hashedPassword,
                Salt = salt
            };
            
            if(validatedRole == "clinic"){
			    ClinicEntity clinic = new ClinicEntity {
			    	Name = newUser.Username,
			    };
			    dbContext.Clinics.Add(clinic);  
            }

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            // Generate JWT token
            var token = Encryption.GenerateJwtToken(user);

            return Results.CreatedAtRoute("GetUser", new { id = user.Id }, new { token, user });
        }).WithParameterValidation();

        group.MapPost("/login", (LoginDto loginDto, DoctorFinderContext dbContext) =>
        {
            var normalizedEmail = loginDto.Email.ToLower();
            var user = dbContext.Users.FirstOrDefault(user => user.Email!.ToLower() == normalizedEmail);

            if (user == null)
            {
                return Results.BadRequest("Invalid email or password.");
            }

            bool isPasswordValid = Encryption.VerifyPassword(loginDto.Password, user.Password!, user.Salt!);

            if (!isPasswordValid)
            {
                return Results.BadRequest("Invalid email or password.");
            }
            // Generate JWT token
            var token = Encryption.GenerateJwtToken(user);
            return Results.Ok(new { message = "Login successful", token, user.Id, user.Username, user.Role, user.ImageUrl});
        });
        return group;
    }



}
