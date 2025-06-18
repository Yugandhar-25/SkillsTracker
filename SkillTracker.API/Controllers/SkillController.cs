using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillsTracker.API.Models;

namespace SkillsTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly SkillContext skillContext;
        public SkillController(SkillContext skillContext)
        {
            this.skillContext = skillContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            var skills = await skillContext.skills.ToListAsync<Skill>();
            return Ok(skills);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSkillById(int id)
        {
            var skill = await skillContext.skills.FindAsync(id);
            if (skill == null) { return NotFound(); }
            return Ok(skill);
        }

        [HttpPost]
        public async Task<IActionResult> AddSkill(Skill skill)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await skillContext.skills.AddAsync(skill);
            await skillContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSkillById), new { id = skill.Id}, skill);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSkill(int id, [FromBody] Skill skill)
        {
            var oldSkill = await skillContext.skills.FindAsync(id);
            if (oldSkill == null) { return NotFound(); }
            oldSkill.Name = skill.Name;
            oldSkill.Type = skill.Type;
            oldSkill.Level = skill.Level;            
            oldSkill.Rating = skill.Rating;

            await skillContext.SaveChangesAsync();
            return Ok(oldSkill);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var skill = await skillContext.skills.FindAsync(id);
            if(skill == null) { return NotFound(); }

            skillContext.skills.Remove(skill);
            await skillContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
