import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { SliderServiceService } from 'src/app/Services/slider-service.service';
import { Review } from 'src/app/review.model';
import { ToastrService } from 'ngx-toastr';
import { Testimonial } from 'src/app/testimonial';
import { Reply } from 'src/app/reply';
import { NavigationExtras, Router } from '@angular/router';
import { ServerDetails } from 'src/app/server-details';
import { DetailsServer } from 'src/app/details-server';
import { TopicView } from 'src/app/topic-view';

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
  testimonial:any;
  replies:any;
  testReply:any;
  count:any;
  topicTest:any;
  topic_id:any;
  topicListInCategory:any;
  readTime:any;
  topic_name:any;
  testimonialPerTopic:any;

  image:string | undefined;
  altimage:string | undefined;

  p: number=1;
  term='';
  itemsPerPage:number=3;

  rev = new Review();
  test = new Testimonial();
  reply=new Reply();
  view = new TopicView();
  isReadmore =true;


  showText(){
    this.isReadmore=!this.isReadmore;
  }
  
  // imagePath:any= DetailsServer.imageurl;
  imagePath:any='http://127.0.0.1:8000/uploads/images/';
  visits: any;
  constructor(private sliderService: SliderServiceService,private toastr:ToastrService,private router:Router) {}

  ngOnInit() {

    this.topicsInCategory();
    this.readingTime();
    this.viewCount();
    this.testimonialOnTopic();
    this.testimonialCount();
    this.likedReview();
    this.testimonialTopic();
    this.User();
    this.replyTestimonial();
    this.image="https://www.cut.ac.zw/portal/ids/"+this.testimonials.reg_number+".JPG" 
    this.altimage="https://www.cut.ac.zw/portal/ids/"+this.testimonials.reg_number+".JPG"
    $('#altimg').css('display','none');

    // console.log('image rngu',this.image);
    
  
  }
  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
    $('#altimg').css('display','block');
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

    return (this.student);
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
    this.rev.is_liked=this.rev.is_liked;


    if (!this.student) {
      this.toastr.error('Log in to Like')
    } else {
      this.rev.student_id=this.student.student_id;
      this.sliderService.addReview(this.rev).subscribe(res=>{
        this.review=res;
        this.likedReview()
        if(this.review.status ==200){
          this.toastr.success(
            JSON.stringify(this.review.message),
            JSON.stringify(this.review.data),
            {
              timeOut:6000,
              progressBar:true,
     
            }
          );
        }else{
          this.toastr.error(
            JSON.stringify(this.review.message),
            JSON.stringify(this.review.data),
            {
              timeOut:6000,
              progressBar:true
            }
     
          )
        }
        // console.log(this.testimonial);
      })
    }
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
    this.view.is_viewed =1;

    var formdata = new FormData();

    formdata.append('topic_id', this.Topic.topic_id);
    this.rev.topic_id = this.topic.topic_id;
    this.rev.student_id = this.User.student_id;
    this.rev.is_viewed = this.view.is_viewed;
    

    this.sliderService.topicTestimonial(this.rev).subscribe(res=>{

      this.data=res;

      this.data.testimonials.forEach((element: any) => {
        this.testimonials = element
      });

      this.data.topicTestimonial.forEach((element: any) => {
        this.topicTestimonial = element
      });
    });
  }

  testimonialOnTopic(){
    this.rev.topic_id = this.topic.topic_id;
    this.sliderService.testimonialPerTopic(this.rev).subscribe(res=>{

      this.testimonialPerTopic=res;
     
      this.testimonialPerTopic.forEach((element: any) => {
        this.testimonials = element
        console.log(this.testimonials.reg_number);
      });
 
    });

  }

  addTestimonial(){
    this.test.is_active = "inactive";
    this.test.topic_id = this.topic.topic_id;
    if (!this.student) {
      this.toastr.error('Log in to comment')
    } else {
      this.test.student_id=this.student.student_id;
      this.sliderService.Testimonial(this.test).subscribe(res=>{
        this.testimonial=res;
        this.testimonialCount();
        if(this.testimonial.status ==200){
          this.toastr.success(
            JSON.stringify(this.testimonial.message),
            JSON.stringify(this.testimonial.data),
            {
              timeOut:6000,
              progressBar:true,
     
            }
          );
        }else{
          this.toastr.error(
            JSON.stringify(this.testimonial.message),
            JSON.stringify(this.testimonial.data),
            {
              timeOut:6000,
              progressBar:true
            }    
          )
        }
      })
    }
  }

  replyTestimonial(){

    this.sliderService.addReplyTestimonial(this.reply).subscribe(res=>{
      this.testReply=res;
      // console.log(this.testReply);
    });
  }

  navigateToCategoryHome(home:any){
    this.sliderService.categoryHome=home;
    console.log(this.sliderService.categoryHome);
   
    this.router.navigate(['/topicCategoryHome']).then(()=>{
      window.location.reload();
    })
  }

  testimonialCount(){
    var formdata = new FormData();

    formdata.append('topic_id', this.Topic.topic_id);
    this.sliderService.countTestimonial(formdata).subscribe(res=>{
      this.count=res;
      // console.log(this.count);
    })
  }

  topicsInCategory(){
    var formdata = new FormData();
    formdata.append('topic_category_id',this.Topic.topic_category_id);
    formdata.append('topic_id',this.Topic.topic_id);
    this.sliderService.getTopicsInCategory(formdata).subscribe(res=>{
      this.topicListInCategory=res;
      // console.log(res);

    })
  }
  navigateToTopic(topic:any){
    this.sliderService.TopicHome=topic;
    // console.log(topic);
    
    this.router.navigate(['/topicHome']).then(()=>{
      window.location.reload();
    })
   
  }

  readingTime(){
    var formdata = new FormData();
    formdata.append('topic_id', this.Topic.topic_id);
    this.sliderService.timeReading(formdata).subscribe(res=>{
      this.readTime=res;
      // console.log(this.readTime);
    })
  }

  viewCount(){
    this.rev.topic_id = this.topic.topic_id;
    this.sliderService.countView(this.rev).subscribe(res=>{
      this.visits=res;
      // console.log(this.visits);
    })
  }

  

}
