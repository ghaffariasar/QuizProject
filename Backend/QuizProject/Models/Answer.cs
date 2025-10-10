// Models/Answer.cs

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace QuizProject.Models
{
    public class Answer
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public bool IsCorrect { get; set; }

        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }

        [JsonIgnore]
        public  Question? Question { get; set; }
    }
}