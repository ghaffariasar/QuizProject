using System.ComponentModel.DataAnnotations;

namespace QuizProject.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public DateTime ExpirationDate { get; set; }

        public int DurationMinutes { get; set; }

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
