import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

import {TimeAgoPipe} from 'time-ago-pipe';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { LeftComponent } from './user/user-home/left/left.component';
import { RightComponent } from './user/user-home/right/right.component';
import { UserFeedComponent } from './user/user-home/user-feed/user-feed.component';
import { ProfileComponent } from './user/user-home/profile/profile.component';
import { ExploreComponent } from './user/user-home/explore/explore.component';
import { PostComponent } from './user/user-home/post/post.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminPostReviewComponent } from './admin/admin-post-review/admin-post-review.component';
import { AdminBadwordComponent } from './admin/admin-badword/admin-badword.component';
import { AdminAdvertismentComponent } from './admin/admin-advertisment/admin-advertisment.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AdminNotificationAreaComponent } from './admin/admin-notification-area/admin-notification-area.component';
import { PeopleComponent } from './user/user-home/explore/people/people.component';
import { MyPostComponent } from './user/user-home/explore/my-post/my-post.component';
import { FollowersComponent } from './user/user-home/explore/followers/followers.component';
import { FollowingsComponent } from './user/user-home/explore/followings/followings.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  declarations: [
    TimeAgoPipe,
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    EditProfileComponent,
    UserHomeComponent,
    LeftComponent,
    RightComponent,
    UserFeedComponent,
    ProfileComponent,
    ExploreComponent,
    PostComponent,
    AdminHomeComponent,
    AdminProfileComponent,
    AdminPostReviewComponent,
    AdminBadwordComponent,
    AdminAdvertismentComponent,
    AdminNotificationAreaComponent,
    PeopleComponent,
    MyPostComponent,
    FollowersComponent,
    FollowingsComponent
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent
  ],
  providers: []
})
export class PagesModule {}
