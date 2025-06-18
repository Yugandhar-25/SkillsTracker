namespace SkillsTracker.API.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Level { get; set; }
        public int Rating { get; set; }
    }
}
