using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

public static class Encryption{
    private static readonly string SecretKey = "thisisaverylongandsecurekeythatmeetsrequirements";

    public static JsonElement DecodeJwtPayload(string token)
    {
        // Split the JWT into three parts (Header, Payload, Signature)
        var parts = token.Split('.');

        if (parts.Length != 3)
            throw new ArgumentException("The JWT is not correctly formatted.");

        // The second part is the payload
        var payload = parts[1];

        // Add padding if required
        payload = payload.Replace('-', '+').Replace('_', '/');
        switch (payload.Length % 4)
        {
            case 2: payload += "=="; break;
            case 3: payload += "="; break;
        }

        // Decode the Base64Url encoded payload
        var bytes = Convert.FromBase64String(payload);
        var jsonPayload = Encoding.UTF8.GetString(bytes);
        var jsonDocument = JsonDocument.Parse(jsonPayload);
        var root = jsonDocument.RootElement;

        return root;
    }
    
    public static string HashPassword(string password, out string salt)
    {
        // Generate a 16-byte (128-bit) salt using a cryptographically secure random number generator
        byte[] saltBytes = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }

        // Convert the salt to a readable format (e.g., Base64 or hex)
        salt = Convert.ToBase64String(saltBytes);

        // Combine the salt and password
        string saltedPassword = salt + password;

        // Hash the salted password
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));

            // Convert the hash to a hexadecimal string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
    public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
    {
        // Combine the stored salt and the entered password
        string saltedPassword = storedSalt + enteredPassword;
    
        // Hash the salted password
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
    
            // Convert the hash to a hexadecimal string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
    
            // Compare the generated hash with the stored hash
            return builder.ToString() == storedHash;
        }
    }    

    public static string GenerateJwtToken(UserEntity user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
    
        // Check if SecretKey is initialized properly
        if (string.IsNullOrEmpty(SecretKey)){
            throw new ArgumentNullException(nameof(SecretKey), "SecretKey cannot be null or empty");
        }
        if (string.IsNullOrEmpty(user.Role) || (user.Role != "user" && user.Role != "clinic")){
            throw new ArgumentException("Invalid role. Only 'user' or 'clinic' roles are allowed.");
        }
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name,user.Username!),
            new Claim(ClaimTypes.Role,user.Role)
        };

        var key = Encoding.ASCII.GetBytes(SecretKey);
    
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = "localhost:5117"
        };
    
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }


}