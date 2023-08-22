import { Component, OnInit } from '@angular/core';
import { SliderServiceService } from 'src/app/Services/slider-service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  data:any;

  constructor(private sliderService:SliderServiceService){}

  ngOnInit(){
    this.sliderTopic();
      
  }
  sliderTopic(){
    this.sliderService.getTopicSlider().subscribe(res=>{
      this.data=res;
      JSON.stringify(this.data);
      // console.log(this.data);

    })
  }

}
