using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace QuizProject.Models
{
    public class Result
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Quiz))]
        public int QuizId { get; set; }

        [JsonIgnore]
        public Quiz? Quiz { get; set; }

        [Required]
        public string UserName { get; set; }

        public int Score { get; set; }

        public bool Passed { get; set; }

        public DateTime TakenAt { get; set; } = DateTime.UtcNow;
    }
}
