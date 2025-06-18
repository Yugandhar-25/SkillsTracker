import { Routes } from '@angular/router';
import { SkillsComponent } from './components/skills/skills.component';
import { UpdateSkillsComponent } from './components/update-skills/update-skills.component';

export const routes: Routes = [
    {path: '', component: SkillsComponent},
    {path: 'update/:id', component: UpdateSkillsComponent},
    {path: '**', redirectTo: ''}
];
