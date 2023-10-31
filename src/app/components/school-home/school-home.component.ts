import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { SliderServiceService } from 'src/app/Services/slider-service.service';
import { ServerDetails } from 'src/app/server-details';

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.css']
})
export class SchoolHomeComponent implements OnInit {
  public form = {
    reg_number: null,
    password: null,
  };
  public error: any = null;
  data:any;
  dat:any;
  // imagePath:any=ServerDetails.imageurl + '/storage/images/';
  imagePath:any='http://127.0.0.1:8000/uploads/images/';
  p: number=1;
  term='';
  itemsPerPage:number=6;
  totalTopics:any;
  xool:any;
  category: any;
  dataCategory:any;
  topicLogin: any;

  ngOnInit(): void {
    this.schoolData();
    this.loginState();  
      
  }

  constructor(private slider:SliderServiceService,private router:Router,private auth:AuthServiceService,private toastr:ToastrService){}



  get SchoolData() {
    const school: any = localStorage.getItem('schoolHome');
    // console.log(school);

    this.xool = JSON.parse(school);
    // console.log(this.xool);

    return (this.xool);
  }
  loginState() {
    const topic: any = localStorage.getItem('user');
    // console.log(topic);
    this.topicLogin = JSON.parse(topic);
    JSON.stringify(this.topicLogin);
    console.log(this.topicLogin);
    return (this.topicLogin);
  }
  
  get homeCategory() {
    const category: any = localStorage.getItem('categoryHome');
    // console.log(school);

    this.category = JSON.parse(category);
    // console.log(this.xool);

    return (this.category);
  }
  schoolData(){

    var formdata = new FormData();

    // console.log('school ID', this.SchoolData.school_id);
    

    formdata.append('school_id',this.SchoolData.school_id);

    this.slider.schoolTopic(formdata).subscribe(res=>{

      this.data=res;


      // console.log('data', this.data);
      this.totalTopics=this.data['length'];
      JSON.stringify(this.data);
      // console.log(this.data['length']);
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

 getCategoryData(){
  this.slider.homeCategory().subscribe(res=>{
    this.dataCategory=res;
    console.log(this.dataCategory);
  });
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
