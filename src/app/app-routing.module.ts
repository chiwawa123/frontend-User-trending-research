import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopicHomeComponent } from './components/topic-home/topic-home.component';
import { SchoolHomeComponent } from './components/school-home/school-home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'topicHome', component: TopicHomeComponent },
      { path: 'schoolHome', component: SchoolHomeComponent },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
