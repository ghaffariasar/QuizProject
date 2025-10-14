using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Data;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuizzesController(QuizContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var quizzes = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .ToListAsync();
            return Ok(quizzes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
                return NotFound();

            return Ok(quiz);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Quiz quiz)
        {
            if (quiz.Questions != null && quiz.Questions.Count > 0)
            {
                for (int i = 0; i < quiz.Questions.Count; i++)
                {
                    var q = quiz.Questions.ElementAt(i);
                    _context.Questions.Attach(q);
                }
            }

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = quiz.Id }, quiz);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Quiz quiz)
        {
            if (id != quiz.Id)
                return BadRequest();

            var existingQuiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuiz == null)
                return NotFound();

            // به‌روزرسانی عنوان، مدت و تاریخ انقضا
            existingQuiz.Title = quiz.Title;
            existingQuiz.DurationMinutes = quiz.DurationMinutes;
            existingQuiz.ExpirationDate = quiz.ExpirationDate;

            // پاک کردن سوال‌هایی که حذف شده‌اند
            var toRemove = existingQuiz.Questions
                .Where(q => !quiz.Questions.Any(updated => updated.Id == q.Id))
                .ToList();

            foreach (var q in toRemove)
            {
                existingQuiz.Questions.Remove(q);
            }

            // افزودن یا Attach سوال‌های جدید/موجود
            foreach (var q in quiz.Questions)
            {
                if (!_context.Questions.Local.Any(x => x.Id == q.Id))
                {
                    // Attach اگر موجود باشد
                    _context.Questions.Attach(q);
                }

                if (!existingQuiz.Questions.Any(x => x.Id == q.Id))
                {
                    existingQuiz.Questions.Add(q);
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
                return NotFound();

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
