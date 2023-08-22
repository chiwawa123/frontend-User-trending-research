import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderServiceService } from 'src/app/Services/slider-service.service';

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.css']
})
export class SchoolHomeComponent implements OnInit {
  data:any;
  imagePath:any='http://127.0.0.1:8000/storage/images/';
  p: number=1;
  term='';
  itemsPerPage:number=6;
  totalTopics:any;
  xool:any;

  ngOnInit(): void {
    this.schoolData();
      
  }

  constructor(private slider:SliderServiceService,private router:Router){}



  get SchoolData() {
    const school: any = localStorage.getItem('schoolHome');
    console.log(school);

    this.xool = JSON.parse(school);
    // console.log(this.xool);

    return (this.xool);
  }
  schoolData(){

    var formdata = new FormData();

    console.log('school ID', this.SchoolData.school_id);
    

    formdata.append('school_id',this.SchoolData.school_id);

    this.slider.schoolTopic(formdata).subscribe(res=>{

      this.data=res;

      console.log('data', this.data);
      this.totalTopics=this.data['length'];
      JSON.stringify(this.data);
      // console.log(this.data['length']);
    });

  }


  navigateToTopic(topic:any){
    this.slider.TopicHome=topic;
    // console.log(topic);
    
    this.router.navigate(['topicHome']);


  }

}
