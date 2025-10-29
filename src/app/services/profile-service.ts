import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class profileService {

  private baseUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  editProfile(profileData: Profile): Observable<any> {
    const id = profileData.id;
    return this.http.put(`${this.baseUrl}/${id}`, profileData);
    // return this.http.put(this.baseUrl, profileData);
  } 

} 

