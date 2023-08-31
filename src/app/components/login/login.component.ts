import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any;

  public form = {
    reg_number: null,
    password: null,
  };
  public error: any = null;

  ngOnInit(): void {
    
  }

  constructor(private auth:AuthServiceService, private route:Router,private toastr:ToastrService){}

  onSubmit(){ 

    this.auth.login(this.form).subscribe(res=>{
      this.data=res;
      if(this.data.status ==200){
        this.toastr.success(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.data),
          {
            timeOut:6000,
            progressBar:true,
   
          }
        );
      }
  
      localStorage.setItem('user',JSON.stringify(this.data))

      this.route.navigate(['main/home']).then(()=>{
        window.location.reload();
      })

    },  error=>{
      // this.handleError(error);
      this.data=error;
      this.toastr.error(
        this.data.error.message,
        JSON.stringify(this.data.data),
        {
          timeOut:6000,
          progressBar:true
        }
 
      )
    }
    
    );

  }


  



}
