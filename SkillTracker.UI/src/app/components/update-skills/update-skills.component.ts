import { Component, OnInit } from '@angular/core';
import { Skill } from '../../models/skill.ts/skill';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from '../../services/skill.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-skills',
  imports: [FormsModule],
  templateUrl: './update-skills.component.html',
  styleUrl: './update-skills.component.scss'
})
export class UpdateSkillsComponent implements OnInit{

  skill: Skill = {
    id:0,
    name:'',
    type:'',
    level:'',
    rating:0
  }

  constructor(private route: ActivatedRoute, private router: Router, private skillService: SkillService, private toastr: ToastrService){}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if(id){
      this.skillService.getSkillById(id).subscribe((skill) => {
          this.skill=skill;
        }
      )
    }
  }

  updateSkill(){
    this.skillService.updateSkill(this.skill.id, this.skill).subscribe({
      next: ()=>{
      this.toastr.success('Skill updated successfully!', 'success');
      this.router.navigate(['/']);
      }
    })
  }
}
