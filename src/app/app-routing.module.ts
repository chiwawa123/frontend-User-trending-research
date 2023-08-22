import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopicHomeComponent } from './components/topic-home/topic-home.component';
import { SchoolHomeComponent } from './components/school-home/school-home.component';

const routes: Routes = [

  { path:'',component:HomeComponent},
  { path:'topicHome', component:TopicHomeComponent},
  { path:'schoolHome', component:SchoolHomeComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
