import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { TopicHomeComponent } from './components/topic-home/topic-home.component';
import { SchoolHomeComponent } from './components/school-home/school-home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { TopicCategoryComponent } from './topic-category/topic-category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { NgxUiLoaderHttpModule,NgxUiLoaderModule } from "ngx-ui-loader"
 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MorelessComponent } from './moreless/moreless.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SliderComponent,
    TopicHomeComponent,
    SchoolHomeComponent,
    LoginComponent,
    MainComponent,
    TopicCategoryComponent,
    NotFoundComponent,
    ContactComponent,
    MorelessComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    NgxPaginationModule,
    FormsModule,HttpClientModule, ToastrModule.forRoot({progressBar:true,timeOut:6000,progressAnimation:'increasing',preventDuplicates:true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
