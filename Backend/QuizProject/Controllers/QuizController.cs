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

        // GET: api/quizzes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var quizzes = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .ToListAsync();
            return Ok(quizzes);
        }

        // GET: api/quizzes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null) return NotFound();
            return Ok(quiz);
        }

        // POST: api/quizzes
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Quiz quiz)
        {
            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = quiz.Id }, quiz);
        }

        // PUT: api/quizzes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Quiz quiz)
        {
            if (id != quiz.Id) return BadRequest();

            _context.Entry(quiz).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/quizzes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null) return NotFound();

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
