import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isLoggedIn= new BehaviorSubject<boolean>(false);

  toggleLogin(state:boolean):void{
    this.isLoggedIn.next(state);

  }

  status(){
    const localData = localStorage.getItem('user');
    if(!localData){
      this.isLoggedIn.next(false);
      console.log("user not logged In");
    }else{
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn.asObservable();
  }



  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post('http://127.0.0.1:8000/api/loginStudent',data);
  }
  getHeaders(){
    const token:any = localStorage.getItem('user');
    var userObj = JSON.parse(token);
    var student_token = userObj.token;
    
    return new HttpHeaders({
      Accept: 'application/json',
      'content-type':'application/json',
      Authorization: `Bearer `+ student_token ,

    });
  }
}
