namespace backend.Models
{
    public class UserEntity
    {
        public int Id{ get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? ImageUrl {get;set;}
        public string? Role { get;set; }
        public string? Password { get; set; }
        public string? Salt { get; set; }
        
    }
}
