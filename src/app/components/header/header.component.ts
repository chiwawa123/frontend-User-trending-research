import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderServiceService } from 'src/app/Services/slider-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data:any;
  xool:any;
  ngOnInit(): void {
    this.getSchools();
      
  }
  constructor(private school:SliderServiceService, private router:Router){

  }
  getSchools(){
    this.school.getSchools().subscribe(res=>{
      this.data=res;
      // console.log(this.data);
    });

  }
  get schoolData(){

    const xool:any=localStorage.getItem('schoolHome');
    console.log(xool);
    

    return JSON.parse(xool);

  }
  navigateToSchool(schoolHome:any){
    this.school.SchoolHome=schoolHome;
    // console.log(schoolHome);
    
    this.router.navigate(['schoolHome']);

  }
  
  click(){
    this.router.navigate(['']).then(()=>{
      window.location.reload();
    })
  }

}
