import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public hasCurrentUser: boolean = false;

  constructor(private eventService: EventService, private userService: UserService, private router: Router) {
    if (userService.getCurrentUser() != "") {
      this.hasCurrentUser = true;
    }
  }

  public events: [];

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(resp => {
      this.events = resp;
    })
  }

  public createEvent() {
    this.router.navigate(['/event/create']);
  }

  public viewEvent(id: String) {
    this.router.navigate(['/event', id]);
  }

}
