import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  public form: FormGroup;
  public eventName: FormControl = new FormControl();
  public description: FormControl = new FormControl();
  public startTime: FormControl = new FormControl();
  public endTime: FormControl = new FormControl();

  public failedEventName: boolean = false;
  public failedDescription: boolean = false;
  public failedMinVolunteers: boolean = false;
  public failedEventStartTime: boolean = false;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) {
    this.form = this.formBuilder.group({
      "eventName": this.eventName,
      "description": this.description,
      "startTime": this.startTime,
      "endTime": this.endTime
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.eventName.value == null || this.eventName.value == "") {
      this.failedEventName = true;
    } else {
      this.failedEventName = false;
    }
    if (this.description.value == null || this.description.value == "") {
      this.failedDescription = true;
    } else {
      this.failedDescription = false;
    }
    if (this.startTime.value == null || this.startTime.value == 0) {
      this.failedEventStartTime = true;
    } else {
      this.failedEventStartTime = false;
    }
    if (this.failedEventName || this.failedDescription || this.failedMinVolunteers || this.failedEventStartTime) {
      return;
    }
    this.eventService.createNewEvent(this.eventName.value, this.description.value, new Date(this.startTime.value).valueOf(), new Date(this.endTime.value).valueOf()).subscribe(resp => {
      if (resp != null) {
        this.router.navigate(['/event', resp.ID])
      }
    });
  }

}
