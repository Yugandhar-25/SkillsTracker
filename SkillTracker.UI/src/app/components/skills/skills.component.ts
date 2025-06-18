import { Component, numberAttribute, OnInit } from '@angular/core';
import { Skill } from '../../models/skill.ts/skill';
import { SkillService } from './../../services/skill.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-skills',
  imports: [FormsModule, CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit{
  skills: Skill[] = [];
  newSkill: Skill = {id: 0, name:'', type:'', level:'', rating:0};
  loading=true;
  error='';

  constructor(private skillService: SkillService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
      this.loadSkills();
  }

  loadSkills() {
    this.loading=true;
    this.skillService.getSkills().subscribe({
      next: (res)=>{
        this.skills = res;
        this.loading = false;
      },
      error: ()=>{
        this.error = 'Failed';
        this.loading=false;
      }
    })
  }

  addSkill(){
    this.skillService.createSkill(this.newSkill).subscribe({
      next: ()=>{
        this.toastr.success('Skill added successfully!', '✅ Done');
        this.newSkill = {id: 0, name:'', type:'', level:'', rating:0};
        this.loadSkills();
      }
    })
  }

  deleteSkill(id: number){
    if(confirm('Are you sure?')){
        this.skillService.deleteSkill(id).subscribe({
          next: ()=>{
          this.toastr.success('Skill deleted successfully!', '🗑️ Deleted');
          this.loadSkills();
        }
      })
    }
  }

  updateSkill(id: number){
    this.router.navigate(['/update', id]);
  }

}
