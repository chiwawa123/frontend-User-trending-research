import { Component, OnInit } from '@angular/core';
import { SliderServiceService } from '../Services/slider-service.service';
import { Router } from '@angular/router';
import { DetailsServer } from '../details-server';
import { AuthServiceService } from '../Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic-category',
  templateUrl: './topic-category.component.html',
  styleUrls: ['./topic-category.component.css']
})
export class TopicCategoryComponent implements OnInit{
  public form = {
    reg_number: null,
    password: null,
  };
  public error: any = null;
  dat:any;
  topicCategory: any;
  category: any;
  data: any;
  imagePath:any='http://127.0.0.1:8000/uploads/images/';
  topicLogin: any;
  constructor(private slider:SliderServiceService,private router:Router,private auth:AuthServiceService, private toastr:ToastrService){

  }

  ngOnInit(){
      this.dataCategory();
  }
  loginState() {
    const topic: any = localStorage.getItem('user');
    // console.log(topic);
    this.topicLogin = JSON.parse(topic);
    JSON.stringify(this.topicLogin);
    console.log(this.topicLogin);
    return (this.topicLogin);
  }

  get categoryData() {
    const category: any = localStorage.getItem('categoryHome');
    // console.log(school);

    this.category = JSON.parse(category);
    // console.log(this.xool);

    return (this.category);
  }

  dataCategory(){

    var formdata = new FormData();

    // console.log('school ID', this.SchoolData.school_id);
    

    formdata.append('topic_category_id',this.categoryData.topic_category_id);

    this.slider.getTopicCategory(formdata).subscribe(res=>{

      this.data=res;
      console.log(this.data);

    });

  }

  
  navigateToTopic(topic:any){
    this.slider.TopicHome=topic;
    // console.log(topic);
    
   
    this.router.navigate(['/topicHome']);
  }
  navigateToTopicHomeafterLogin(topic:any){
    this.slider.TopicHome=topic;
    // console.log(topic);    
    this.router.navigate(['/topicHome']);
    
  }
  navigateToCategoryHome(home:any){
    this.slider.categoryHome=home;
    // console.log(topic);
   
    this.router.navigate(['/topicCategoryHome']).then(()=>{
      window.location.reload();
    })
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

}
