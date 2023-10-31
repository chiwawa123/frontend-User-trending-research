import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopicHomeComponent } from './components/topic-home/topic-home.component';
import { SchoolHomeComponent } from './components/school-home/school-home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { TopicCategoryComponent } from './topic-category/topic-category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AfterLoginService } from './guards/after-login.service';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'topicHome', component: TopicHomeComponent,canActivate:[AfterLoginService]},
  { path: 'schoolHome', component: SchoolHomeComponent },
  { path: 'topicCategoryHome', component: TopicCategoryComponent },
  {path:'contact',component:ContactComponent},
  { path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
