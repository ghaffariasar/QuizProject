using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Data;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultsController : ControllerBase
    {
        private readonly QuizContext _context;
        public ResultsController(QuizContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await _context.Results
                .Include(r => r.Quiz)
                .ToListAsync();
            return Ok(results);
        }

        // GET: api/results/top/5
        [HttpGet("top/{limit}")]
        public async Task<IActionResult> GetTop(int limit)
        {
            var topResults = await _context.Results
                .Include(r => r.Quiz)
                .OrderByDescending(r => r.Score)
                .Take(limit)
                .ToListAsync();
            return Ok(topResults);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Results
                .Include(r => r.Quiz)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Result result)
        {
            _context.Results.Add(result);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
    }
}