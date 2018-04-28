import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { PracticeComponent } from './components/home/practice/practice.component';
import { AppRoutiongModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { ConfirmmailComponent } from './components/confirmmail/confirmmail.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { ProfileComponent } from './components/home/profile/profile.component';
import { CompeteComponent } from './components/home/compete/compete.component';
import { EditprofileComponent } from './components/home/editprofile/editprofile.component';
import { CategoriesComponent } from './components/home/categories/categories.component';
import { Categories } from './services/categories.service';
import { InstructionComponent } from './components/home/instruction/instruction.component';
import { QuestionsComponent } from './components/home/questions/questions.component';
import { QuestionService } from './services/question.service';
import { ProfileService } from './services/profile.service';
import { InstructionCompeteComponent } from './components/home/instruction-compete/instruction-compete.component';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    ComponentsComponent,
    ServicesComponent,
    HomeComponent,
    HeaderComponent,
    PracticeComponent,
    ConfirmmailComponent,
    ProfileComponent,
    CompeteComponent,
    EditprofileComponent,
    CategoriesComponent,
    InstructionComponent,
    QuestionsComponent,
    InstructionCompeteComponent
  ],
  imports: [
    BrowserModule, MDBBootstrapModule.forRoot(),
    AppRoutiongModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService, AuthGuard, Categories, QuestionService, ProfileService, WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
