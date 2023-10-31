import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { ServerDetails } from '../server-details';

@Injectable({
  providedIn: 'root',
})
export class SliderServiceService {
  topicView: any;
  schoolView: any;
  header:any;
  topicCategoryView:any;
  categoryView: any;

  constructor(private http: HttpClient,public headers:AuthServiceService) {
    this.header = headers.getHeaders();
  }

  getTopicSlider() {
    return this.http.get(ServerDetails.serverIP + '/topicSlider');
  }
  set TopicHome(topicView: any) {
    this.topicView = topicView;
    // console.log(topicView);

    localStorage.setItem('topicHome', JSON.stringify(topicView));
  }

  schoolTopic(data:any){
    return this.http.post(ServerDetails.serverIP + '/schoolData',data);
  }
  getSchools(){
    return this.http.get(ServerDetails.serverIP + '/schoolView');
  }
  getReviewCount(data:any){
    return this.http.post(ServerDetails.serverIP + '/review',data);
  }

  getTopicsInCategory(data:any){
    return this.http.post(ServerDetails.serverIP + '/topicsInCategory',data);
  }
  timeReading(data:any){
    return this.http.post(ServerDetails.serverIP + '/reeadingTime',data);

  }
  set SchoolHome(schoolView: any){
    this.schoolView = schoolView;
    console.log(schoolView);
    localStorage.setItem('schoolHome', JSON.stringify(schoolView)); 
  }

  addReview(data:any){
// console.log(data);
    return this.http.post(ServerDetails.serverIP + "/addReview",data,{headers:this.header});
  }

  topicTestimonial(data:any){
    return this.http.post( ServerDetails.serverIP + "/topicTestimonial",data,{headers:this.header});
  }

  reviewCheck(){
    return this.http.get( ServerDetails.serverIP + "/checkReview");
  }
  Testimonial(data:any){
    return this.http.post(ServerDetails.serverIP + "/addTestimonial",data);
  }
  addReplyTestimonial(data:any){
    return this.http.post( ServerDetails.serverIP + "/reply",data);
  }

  viewReply(data:any){
    return this.http.post(ServerDetails.serverIP + "/viewReply",data);

  }

  getTopicCategory(data:any){
    return this.http.post(ServerDetails.serverIP + "/getCategory",data);
  }

  homeCategory(){
    return this.http.get(ServerDetails.serverIP + "/homeCategory");
  }

  set categoryHome(categoryView: any){
    this.categoryView = categoryView;
    console.log(categoryView);

    localStorage.setItem('categoryHome', JSON.stringify(categoryView));
    
  }

  countTestimonial(data:any){
    return this.http.post(ServerDetails.serverIP + "/countTestimonial",data);
  }

  searchTopic(data:any){
    const response = new Promise(resolve =>{
      this.http.post(ServerDetails.serverIP + '/search_topic',data).subscribe(data=>{
        resolve(data);
      }, err =>{
        // console.log(err)
      })
    })
    return response;

  }

  countView(data:any){
    return this.http.post(ServerDetails.serverIP + '/countView',data);
  }

  testimonialPerTopic(data:any){
    return this.http.post(ServerDetails.serverIP + '/testimonialPerTopic',data);
  }

}
