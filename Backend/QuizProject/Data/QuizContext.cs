using QuizProject.Models;
using Microsoft.EntityFrameworkCore;

namespace QuizProject.Data
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {

            Seed();
        }


        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Result> Results { get; set; }



        private void Seed()
        {
            if (this.Questions.Any()) 
                return; 

            var questions = new List<Question>
            {
                new() { Id = 1, Text = "کدام زبان برای توسعه وب سمت سرور استفاده می‌شود؟" },
                new() { Id = 2, Text = "کدام یک از موارد زیر زبان شیءگرا است؟" },
                new() { Id = 3, Text = "در SQL دستور SELECT چه کاری انجام می‌دهد؟" },
                new() { Id = 4, Text = "کدام یک فریم‌ورک جاوااسکریپت است؟" },
                new() { Id = 5, Text = "در C# کلیدواژه var به چه معناست؟" },
                new() { Id = 6, Text = "کدام یک پایگاه داده رابطه‌ای نیست؟" },
                new() { Id = 7, Text = "کدام یک از اصول SOLID مربوط به وابستگی است؟" },
                new() { Id = 8, Text = "در HTML تگ <a> برای چه استفاده می‌شود؟" },
                new() { Id = 9, Text = "در جاوا متغیر static به چه معناست؟" },
                new() { Id = 10, Text = "در معماری MVC، حرف C مخفف چیست؟" }
            };

            var answers = new List<Answer>
            {
                // Question 1
                new() { Id = 1, QuestionId = 1, Text = "C#", IsCorrect = true },
                new() { Id = 2, QuestionId = 1, Text = "HTML", IsCorrect = false },
                new() { Id = 3, QuestionId = 1, Text = "CSS", IsCorrect = false },
                new() { Id = 4, QuestionId = 1, Text = "Photoshop", IsCorrect = false },

                // Question 2
                new() { Id = 5, QuestionId = 2, Text = "C++", IsCorrect = true },
                new() { Id = 6, QuestionId = 2, Text = "HTML", IsCorrect = false },
                new() { Id = 7, QuestionId = 2, Text = "CSS", IsCorrect = false },
                new() { Id = 8, QuestionId = 2, Text = "SQL", IsCorrect = false },

                // Question 3
                new() { Id = 9, QuestionId = 3, Text = "برای انتخاب داده‌ها", IsCorrect = true },
                new() { Id = 10, QuestionId = 3, Text = "برای حذف داده‌ها", IsCorrect = false },
                new() { Id = 11, QuestionId = 3, Text = "برای تغییر ساختار جدول", IsCorrect = false },
                new() { Id = 12, QuestionId = 3, Text = "برای افزودن ستون جدید", IsCorrect = false },

                // Question 4
                new() { Id = 13, QuestionId = 4, Text = "React", IsCorrect = true },
                new() { Id = 14, QuestionId = 4, Text = "Bootstrap", IsCorrect = false },
                new() { Id = 15, QuestionId = 4, Text = "SASS", IsCorrect = false },
                new() { Id = 16, QuestionId = 4, Text = "Node Package Manager", IsCorrect = false },

                // Question 5
                new() { Id = 17, QuestionId = 5, Text = "تعیین نوع متغیر در زمان کامپایل", IsCorrect = true },
                new() { Id = 18, QuestionId = 5, Text = "نوع رشته‌ای ثابت", IsCorrect = false },
                new() { Id = 19, QuestionId = 5, Text = "متغیر عمومی", IsCorrect = false },
                new() { Id = 20, QuestionId = 5, Text = "برای تعریف کلاس", IsCorrect = false },

                // Question 6
                new() { Id = 21, QuestionId = 6, Text = "MongoDB", IsCorrect = true },
                new() { Id = 22, QuestionId = 6, Text = "MySQL", IsCorrect = false },
                new() { Id = 23, QuestionId = 6, Text = "SQL Server", IsCorrect = false },
                new() { Id = 24, QuestionId = 6, Text = "Oracle", IsCorrect = false },

                // Question 7
                new() { Id = 25, QuestionId = 7, Text = "Dependency Inversion", IsCorrect = true },
                new() { Id = 26, QuestionId = 7, Text = "Single Responsibility", IsCorrect = false },
                new() { Id = 27, QuestionId = 7, Text = "Interface Segregation", IsCorrect = false },
                new() { Id = 28, QuestionId = 7, Text = "Open/Closed", IsCorrect = false },

                // Question 8
                new() { Id = 29, QuestionId = 8, Text = "برای لینک دادن به صفحات دیگر", IsCorrect = true },
                new() { Id = 30, QuestionId = 8, Text = "برای پاراگراف", IsCorrect = false },
                new() { Id = 31, QuestionId = 8, Text = "برای تصویر", IsCorrect = false },
                new() { Id = 32, QuestionId = 8, Text = "برای جدول", IsCorrect = false },

                // Question 9
                new() { Id = 33, QuestionId = 9, Text = "متغیر مشترک بین تمام اشیاء کلاس", IsCorrect = true },
                new() { Id = 34, QuestionId = 9, Text = "فقط داخل متد استفاده می‌شود", IsCorrect = false },
                new() { Id = 35, QuestionId = 9, Text = "برای متغیرهای readonly", IsCorrect = false },
                new() { Id = 36, QuestionId = 9, Text = "متغیر خصوصی", IsCorrect = false },

                // Question 10
                new() { Id = 37, QuestionId = 10, Text = "Controller", IsCorrect = true },
                new() { Id = 38, QuestionId = 10, Text = "Client", IsCorrect = false },
                new() { Id = 39, QuestionId = 10, Text = "Command", IsCorrect = false },
                new() { Id = 40, QuestionId = 10, Text = "Configuration", IsCorrect = false }
            };

            this.Questions.AddRange(questions);
            this.Answers.AddRange(answers);
            this.SaveChanges();
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            // Question - Answer 1:N
            modelBuilder.Entity<Question>()
                
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Quiz - Question N:M (optional)
            modelBuilder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithMany();

            base.OnModelCreating(modelBuilder);

        


            //modelBuilder.Entity<Question>().HasData(questions);
            //modelBuilder.Entity<Answer>().HasData(answers);
        }
    }
}
