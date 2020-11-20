import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { EventListComponent } from '../event-list/event-list.component';
import { LoginComponent } from '../login/login.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'profile',
  component: UserProfileComponent
},
{
  path: 'user/create',
  component: UserCreateComponent
},
{
  path: 'event/create',
  component: EventCreateComponent
},
{
  path: 'event/:id',
  component: EventDetailComponent
},
{
  path: 'events',
  component: EventListComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: '**',
  pathMatch: 'full',
  redirectTo: '/login'
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
