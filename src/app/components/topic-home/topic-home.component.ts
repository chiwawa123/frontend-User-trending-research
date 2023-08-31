import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { SliderServiceService } from 'src/app/Services/slider-service.service';
import { Review } from 'src/app/review.model';
import { ToastrService } from 'ngx-toastr';

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
  student:any;
  reviewById:any;
  header:any;

  rev = new Review();
  
  imagePath:any='http://127.0.0.1:8000/storage/images/';
  constructor(private sliderService: SliderServiceService) {}

  ngOnInit() {
    this.likedReview();
    this.testimonialTopic();
    this.User();
  }

  get Topic() {
    const topic: any = localStorage.getItem('topicHome');
    // console.log(topic);

    this.topic = JSON.parse(topic);
    // console.log(this.topic);

    return (this.topic);
  }

  get User() {
    const user: any = localStorage.getItem('user');
    // console.log(topic);

    this.student = JSON.parse(user);
    // console.log(this.student.student_id);

    return JSON.parse(this.student);
  }

  postReview(){
    var formdata = new FormData();

    this.rev.is_liked = 1;
    this.rev.dis_liked = 0;

    formdata.append('topic_id', this.topic.topic_id);
    formdata.append('student_id', this.student.student_id);
    formdata.append('is_liked', this.rev.is_liked);
    formdata.append('dis_liked', this.rev.dis_liked);

    this.rev.topic_id = this.topic.topic_id;
    this.rev.student_id=this.student.student_id;
    this.rev.is_liked=this.rev.is_liked;

    this.sliderService.addReview(this.rev).subscribe(res=>{
      this.review=res;
      this.likedReview()

    });
  }

  likedReview(){
    var formdata = new FormData();

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

    formdata.append('topic_id', this.Topic.topic_id);

    this.sliderService.topicTestimonial(formdata).subscribe(res=>{

      this.data=res;

      this.data.testimonials.forEach((element: any) => {
        this.testimonials = element
      });

      this.data.topicTestimonial.forEach((element: any) => {
        this.topicTestimonial = element
      });

    });
  }


}
