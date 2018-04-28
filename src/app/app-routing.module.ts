import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { AuthGuard } from './services/auth.guard';
import { ConfirmmailComponent } from './components/confirmmail/confirmmail.component';
import { PracticeComponent } from './components/home/practice/practice.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { CompeteComponent } from './components/home/compete/compete.component';
import { EditprofileComponent } from './components/home/editprofile/editprofile.component';
import { CategoriesComponent } from './components/home/categories/categories.component';
import { InstructionComponent } from './components/home/instruction/instruction.component';
import { QuestionsComponent } from './components/home/questions/questions.component';
import { InstructionCompeteComponent } from './components/home/instruction-compete/instruction-compete.component';


const appRoutes: Routes = [
   { path: '', redirectTo: '/welcome', pathMatch: 'full' },
   { path: 'home', component: HomeComponent,
   children: [
    { path: 'category/:id/practice', component: PracticeComponent },
    { path: 'category/:id/practice/:id2', component: InstructionComponent },
    { path: 'category/:id/practice/:id2/start', component: QuestionsComponent},
    { path: 'category/:id/compete', component: InstructionCompeteComponent },
    { path: 'category/:id/compete/c', component: CompeteComponent },
    { path: 'category', component: CategoriesComponent },
    { path: 'editprofile', component: EditprofileComponent },
    { path: '', component: ProfileComponent }
   ] // , canActivate: [AuthGuard]
  },
   { path: 'welcome', component: ComponentsComponent },
   { path: 'mail', component: ConfirmmailComponent },
   { path: '**', redirectTo: '/welcome' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutiongModule {

}
