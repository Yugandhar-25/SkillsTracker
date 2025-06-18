import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.ts/skill';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SkillService {

  private apiUrl = `${environment.apiBaseUrl}/Skill`;

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getSkillById(id: number): Observable<Skill>{
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  createSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  updateSkill(id: number, skill: Skill): Observable<Skill>{
    return this.http.put<Skill>((`${this.apiUrl}/${id}`), skill);
  }

  deleteSkill(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
