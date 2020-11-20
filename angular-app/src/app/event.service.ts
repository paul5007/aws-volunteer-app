import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private userService: UserService) { }

  private basePath = 'https://1ar3k7yz4m.execute-api.us-east-1.amazonaws.com/dev';

  public getEvent(id): Observable<any> {
    const url = this.basePath + "/event/";
    return this.http.get(url + id);
  }

  public getAllEvents(): Observable<any> {
    const url = this.basePath + "/event/readall";
    return this.http.get(url);
  }

  public getUserEvents(username: String): Observable<any> {
    const url = this.basePath + "/event/role/read/" + username;
    return this.http.get(url);
  }

  public getEventRoles(id: String): Observable<any> {
    const url = this.basePath + "/event/role/list/" + id;
    return this.http.get(url);
  }

  public createNewEvent(eventName: String, description: String, minVolunteers: number, maxVolunteers: number, eventStartTime: number, eventEndTime: number): Observable<any> {
    const url = this.basePath + "/event/create";
    var create = {
      "eventName": eventName,
      "description": description,
      "eventStartTime": eventStartTime,
      "eventEndTime": eventEndTime,
      "username": this.userService.getCurrentUser()
    };
    return this.http.post(url, JSON.stringify(create));
  }
}
