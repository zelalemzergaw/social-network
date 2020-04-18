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
import { AdminHomeComponent} from './pages/admin/admin-home/admin-home.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
// this.route.snapshot.paramMap.get("token")
import { Role } from './models';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './util';
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "reset-password",component: ForgotPasswordComponent },
  { path: "new-password/:token", component: NewPasswordComponent },
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
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  exports: []
})
export class AppRoutingModule {}
