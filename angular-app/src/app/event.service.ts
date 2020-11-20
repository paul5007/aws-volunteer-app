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
    console.log(url)
    return this.http.get(url);
  }

  public getUserEvents(username: String): Observable<any> {
    const url = this.basePath + "/role/read/" + username;
    return this.http.get(url);
  }

  public getEventRoles(id: String): Observable<any> {
    const url = this.basePath + "/role/list/" + id;
    return this.http.get(url);
  }

  public createNewEvent(eventName: String, description: String, startTime: number, endTime: number): Observable<any> {
    const url = this.basePath + "/event/create";
    var create = {
      "eventName": eventName,
      "description": description,
      "startTime": startTime,
      "endTime": endTime,
      "username": this.userService.getCurrentUser()
    };
    return this.http.post(url, JSON.stringify(create));
  }
}
