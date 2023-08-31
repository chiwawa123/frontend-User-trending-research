import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { SliderServiceService } from 'src/app/Services/slider-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data:any;
  xool:any;
  loggedIn:boolean=false;
  
  ngOnInit(): void {
    this.getSchools();
    this.auth.status().subscribe(res=>{
      // console.log(res);
      this.loggedIn=res;
    })
      
  }
  constructor(private school:SliderServiceService, private router:Router, private auth:AuthServiceService){

  }
  getSchools(){
    this.school.getSchools().subscribe(res=>{
      this.data=res;
      // console.log(this.data);
    });

  }
  get schoolData(){

    const xool:any=localStorage.getItem('schoolHome');
    // console.log(xool);
    

    return JSON.parse(xool);

  }
  navigateToSchool(schoolHome:any){
    this.school.SchoolHome=schoolHome;
    // console.log(schoolHome);
    this.router.navigate(['main/schoolHome']).then(()=>{
      window.location.reload();
    })
  }
  
  click(){
    this.router.navigate(['main/home']).then(()=>{
      window.location.reload();
    })
  }

  logout(){

    localStorage.removeItem('user');
    this.router.navigateByUrl('/main/home').then(()=>{
      window.location.reload();
    });
  }
}
