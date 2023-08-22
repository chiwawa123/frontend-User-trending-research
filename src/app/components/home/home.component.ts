import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderServiceService } from 'src/app/Services/slider-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  imagePath:any='http://127.0.0.1:8000/storage/images/';
  p: number=1;
  term='';
  itemsPerPage:number=6;
  totalTopics:any;

  constructor(private sliderService:SliderServiceService,private router:Router){

  }
  
  ngOnInit(){
    this.sliderTopic();
      
  }
  sliderTopic(){
    this.sliderService.getTopicSlider().subscribe(res=>{
      this.data=res;
      this.totalTopics=this.data['length'];
      JSON.stringify(this.data),
      console.log(this.data['length']);

    })
  }

  navigateToTopic(topic:any){
    this.sliderService.TopicHome=topic;
    // console.log(topic);
    
    this.router.navigate(['topicHome']);


  }

}
