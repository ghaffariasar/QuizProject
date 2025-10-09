using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Data;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuestionsController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/questions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _context.Questions
                .Include(q => q.Answers)
                .ToListAsync();

            return Ok(questions);
        }

        // GET: api/questions/with-answers
        [HttpGet("with-answers")]
        public async Task<IActionResult> GetAllWithAnswers()
        {
            var questions = await _context.Questions
                .Include(q => q.Answers)
                .ToListAsync();

            return Ok(questions);
        }

        // GET: api/questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        // POST: api/questions
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Question question)
        {
            if (question.Answers.Count != 4)
                return BadRequest("هر سؤال باید دقیقاً ۴ پاسخ داشته باشد.");

            if (!question.Answers.Any(a => a.IsCorrect))
                return BadRequest("حداقل یکی از گزینه‌ها باید صحیح باشد.");

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = question.Id }, question);
        }

        // PUT: api/questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Question question)
        {
            if (id != question.Id)
                return BadRequest();

            _context.Entry(question).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
                return NotFound();

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
