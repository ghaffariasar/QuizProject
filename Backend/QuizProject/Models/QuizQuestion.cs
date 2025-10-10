using System.Text.Json.Serialization;

namespace QuizProject.Models
{
    public class QuizQuestion
    {
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }

        public int QuestionId { get; set; }

        [JsonIgnore]
        public Question? Question { get; set; }
    }
}
