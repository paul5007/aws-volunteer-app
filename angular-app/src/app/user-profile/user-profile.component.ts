import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private eventService: EventService, private router: Router) { }

  public currentUser;
  public events: [];

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser == "") {
      this.router.navigate(['/login'])
    }
    this.eventService.getUserEvents(this.currentUser).subscribe(resp => {
      this.events = resp;
      console.log(this.events)
    });
  }

  public viewEvent(id: String) {
    this.router.navigate(['/event', id]);
  }

}
