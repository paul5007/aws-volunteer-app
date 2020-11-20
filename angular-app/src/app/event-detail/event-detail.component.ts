import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  public event;
  public eventRoles;
  public currentUser: String = "";

  constructor(private eventService: EventService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(resp => {
      this.event = resp
    });
    this.eventService.getEventRoles(this.route.snapshot.paramMap.get('id')).subscribe(resp => {
      this.eventRoles = resp;
    })
    this.currentUser = this.userService.getCurrentUser();
  }

}
