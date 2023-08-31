import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class SliderServiceService {
  topicView: any;
  schoolView: any;
  header:any;

  constructor(private http: HttpClient,public headers:AuthServiceService) {
    this.header = headers.getHeaders();
  }

  getTopicSlider() {
    return this.http.get('http://127.0.0.1:8000/api/topicSlider');
  }
  set TopicHome(topicView: any) {
    this.topicView = topicView;
    console.log(topicView);

    localStorage.setItem('topicHome', JSON.stringify(topicView));
  }


  schoolTopic(data:any){
    return this.http.post('http://127.0.0.1:8000/api/schoolData',data);
  }
  getSchools(){
    return this.http.get('http://127.0.0.1:8000/api/schoolView');
  }
  getReviewCount(data:any){
    return this.http.post('http://127.0.0.1:8000/api/review',data);

  }
  
  set SchoolHome(schoolView: any){
    this.schoolView = schoolView;
    console.log(schoolView);

    localStorage.setItem('schoolHome', JSON.stringify(schoolView));
    
  }

  addReview(data:any){
// console.log(data);

    return this.http.post("http://127.0.0.1:8000/api/addReview",data,{headers:this.header});

  }

  topicTestimonial(data:any){
    return this.http.post("http://127.0.0.1:8000/api/topicTestimonial",data);

  }

  reviewCheck(){
    return this.http.get("http://127.0.0.1:8000/api/checkReview");
  }


}
