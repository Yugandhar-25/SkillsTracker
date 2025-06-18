using Microsoft.EntityFrameworkCore;
using SkillsTracker.API.Models;

namespace SkillsTracker.API
{
    public class SkillContext: DbContext
    {
        public SkillContext(DbContextOptions<SkillContext> options): base(options) 
        { 
        }

        public DbSet<Skill> skills { get; set; }
    }
}
