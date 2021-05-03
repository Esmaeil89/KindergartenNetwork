using System.ComponentModel.DataAnnotations;


namespace kindergartenNetwork.Models.MainModels
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public string Avatar { get; set; }
        public int tryNo { get; set; }
        
      
    }
}

