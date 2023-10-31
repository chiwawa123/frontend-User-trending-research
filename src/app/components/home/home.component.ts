import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SliderServiceService } from 'src/app/Services/slider-service.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsServer } from 'src/app/details-server';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Review } from 'src/app/review.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  public form = {
    reg_number: null,
    password: null,
  };
  public error: any = null;
  rev = new Review();

  dat:any;
  termm:any;
  // imagePath:any=DetailsServer.serverIP + 'uploads/images/';
   imagePath:any='http://127.0.0.1:8000/uploads/images/';
  p: number=1;
  term='';
  itemsPerPage:number=6;
  totalTopics:any;
  token:any;
  topicLogin:any;
  topic_name: any;
  topic: any;
  readTime: any;
  visits: any;
  topicView:any


  constructor(private sliderService:SliderServiceService,private router:Router,private auth:AuthServiceService, private toastr:ToastrService){
  } 
  ngOnInit(){
    this.sliderTopic();
    this.loginState();   
  }
  loginState() {
    const topic: any = localStorage.getItem('user');
    // console.log(topic);
    this.topicLogin = JSON.parse(topic);
    JSON.stringify(this.topicLogin);
    console.log(this.topicLogin);
    return (this.topicLogin);
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
    this.router.navigate(['/topicHome']);
    
  }
  navigateToTopicHomeafterLogin(topic:any){
    this.sliderService.TopicHome=topic;
    // console.log(topic);    
    this.router.navigate(['/topicHome']);
    
  }
  
  onSubmit(){ 
    this.auth.login(this.form).subscribe(res=>{
      this.dat=res;
      
      if(this.dat.status ==200){
        this.toastr.success(
          JSON.stringify(this.dat.message),
          JSON.stringify(this.dat.data),
          {
            timeOut:6000,
            progressBar:true,
          }
        );
      }
  
      localStorage.setItem('user',JSON.stringify(this.dat))
      this.router.navigate(['/topicHome']).then(()=>{
        window.location.reload();
      })
    },  error=>{
      // this.handleError(error);
      this.dat=error;
      this.toastr.error(
        this.dat.error.message,
        JSON.stringify(this.dat.data),
        {
          timeOut:6000,
          progressBar:true
        }
      )
    }
    
    );

  }

  topicSearch(){
  
    const search = this.sliderService.searchTopic({search_topic:this.topic_name}).then(response=>{
      this.data = response;
      console.log(this.data);
    });
  }
  get Topic() {
    const topic: any = localStorage.getItem('topicHome');
    // console.log(topic);

    this.topic = JSON.parse(topic);
    // console.log(this.topic);

    return (this.topic);
  }


  readingTime(){
    var formdata = new FormData();
    formdata.append('topic_id', this.Topic.topic_id);
    this.sliderService.timeReading(formdata).subscribe(res=>{
      this.readTime=res;
      console.log(this.readTime);
    })
  }

  viewCount(){
    this.rev.topic_id = this.topic.topic_id;
    this.sliderService.countView(this.rev).subscribe(res=>{
      this.visits=res;
      console.log(this.visits);
    })
  }

  

  

}
