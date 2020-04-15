import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';

import { UserFeedComponent } from './pages/user/user-home/user-feed/user-feed.component';
import { ProfileComponent } from './pages/user/user-home/profile/profile.component';
import { ExploreComponent } from './pages/user/user-home/explore/explore.component';
import { AuthGuard } from "./guards";
import {AdminHomeComponent} from './pages/admin/admin-home/admin-home.component';
import { Role } from './models';
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
     path: "home",
     component: UserHomeComponent,
     canActivate: [AuthGuard], 
     children: [
       {
         path: 'profile',
         component: ProfileComponent
      },
       {
         path: '',
         component: UserFeedComponent
      },
      {
        path: "explore",
        component:  ExploreComponent
      }

   ]
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", 
    data: {role: Role.Admin}, 
    canActivate: [AuthGuard],
    component: AdminHomeComponent
   }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
