import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url = 'http://localhost:3000/api/note'
  constructor(private http: HttpClient) { }

  saveNotes(body){
    return this.http.post(`${this.url}/save`, body);
  }
  getNotes(){
    return this.http.get(`${this.url}/get`);
  }
  updateNotes(body){
    return this.http.put(`${this.url}/edit`, body)
  }
  removeNotes(noteId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        _id: noteId
      }
    }
    
    return this.http.delete(`${this.url}/remove`,options)
  }
}
