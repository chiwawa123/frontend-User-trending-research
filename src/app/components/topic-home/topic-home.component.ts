import { Component, OnInit } from '@angular/core';
import { SliderServiceService } from 'src/app/Services/slider-service.service';
import { Review } from 'src/app/review.model';

@Component({
  selector: 'app-topic-home',
  templateUrl: './topic-home.component.html',
  styleUrls: ['./topic-home.component.css'],
})
export class TopicHomeComponent implements OnInit {
  topic: any;
  review:any;
  like:any;
  data:any;
  reviewById:any;

  rev = new Review();
  
  imagePath:any='http://127.0.0.1:8000/storage/images/';
  constructor(private sliderService: SliderServiceService) {}

  ngOnInit() {
    this.likedReview();
    this.testimonialTopic();

  }

  get Topic() {
    const topic: any = localStorage.getItem('topicHome');
    // console.log(topic);

    this.topic = JSON.parse(topic);
    // console.log(this.topic);

    return JSON.parse(topic);
  }

  postReview(){
    var formdata = new FormData();

    this.rev.is_liked = 1;
    this.rev.dis_liked = 0;

    formdata.append('topic_id', this.topic.topic_id);
    formdata.append('is_liked', this.rev.is_liked);
    formdata.append('dis_liked', this.rev.dis_liked);



    this.sliderService.addReview(formdata).subscribe(res=>{
      this.review=res;
      this.likedReview()
      
      // console.log(this.review);

    });
  }
  passReview(){
    var formdata = new FormData();

    this.rev.is_liked = 0;
    this.rev.dis_liked = 1;

    formdata.append('topic_id', this.topic.topic_id);
    formdata.append('is_liked', this.rev.is_liked);
    formdata.append('dis_liked', this.rev.dis_liked);



    this.sliderService.addReview(formdata).subscribe(res=>{
      this.review=res;
      this.likedReview();
      
      // console.log(this.review);

    });
  }

  likedReview(){
    var formdata = new FormData();

    console.log('Topic ID', this.Topic.topic_id);
    

    formdata.append('topic_id', this.Topic.topic_id);

    this.sliderService.getReviewCount(formdata).subscribe(res=>{
      this.like=res;
      // console.log('LIKE',this.like);
    });
  }

  testimonials:any;
  topicTestimonial:any;

  testimonialTopic(){

    var formdata = new FormData();

    // console.log('Topic ID', this.Topic.topic_id);
    

    formdata.append('topic_id', this.Topic.topic_id);

    this.sliderService.topicTestimonial(formdata).subscribe(res=>{

      this.data=res;

      this.data.testimonials.forEach((element: any) => {
        this.testimonials = element
      });

      this.data.topicTestimonial.forEach((element: any) => {
        this.topicTestimonial = element
      });


      
      console.log('Data', this.topicTestimonial);
      console.log('Data', this.testimonials);

    });
  }


}
