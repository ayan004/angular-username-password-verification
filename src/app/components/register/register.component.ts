import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  allUsers: any;
  formData: any;
  checkbox: number = 0;
  allFieldsFilled: boolean = false;
  userExist: number = 0;
  constructor(private users: UsersService, private router: Router) { }

    registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    contact_number: new FormControl(''),
    gender: new FormControl(''),
    permanent_address: new FormControl(''),
    temp_address: new FormControl(''),
    travel_preference: new FormControl(''),
    outdoor_games: new FormControl(''),
    indoor_games: new FormControl(''),
    video_games: new FormControl(''),
    other_games: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  })

  ngOnInit(): void { 
    var view_password = document.getElementById("view_password")!;
    view_password.addEventListener("click", ()=> {
      var password = document.getElementById("password")! as HTMLInputElement;
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    });   
    var view_confirm_password = document.getElementById("view_confirm_password")!;
    view_confirm_password.addEventListener("click", ()=> {
      var password = document.getElementById("confirm_password")! as HTMLInputElement;
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    });   
  }

  collectData(){
    this.userExist = 0;
    this.checkbox = 0;
    this.allFieldsFilled = false;
    var mandate_fields = document.getElementById("mandate_fields")!;
    mandate_fields.innerHTML = "";    
    var warn_email_el = document.getElementById("warn_email")!;
    warn_email_el.innerHTML = "";
    var warn_contact_number_el = document.getElementById("warn_contact_number")!;
    warn_contact_number_el.innerHTML = "";
    var resultEl = document.getElementById("resultEl")!;
    resultEl.innerHTML = "";
    this.formData = this.registerForm.value;

    //checking the check boxes are filled up or not - keeping this code separately, to increase code readability - start
    if(this.formData.outdoor_games === "" || this.formData.outdoor_games === false){
      if(this.formData.indoor_games === "" || this.formData.indoor_games === false){
        if(this.formData.video_games === "" || this.formData.video_games === false){
          if(this.formData.other_games === "" || this.formData.other_games === false){
            //do nothing
          } else {
            this.checkbox++;
          }
        } else {
          this.checkbox++;
        }
      } else {
        this.checkbox++;
      }
    } else {
      this.checkbox++;
    }
    //end

    //checking all the fields are filled or not - start
    if(this.formData.username !== ""){
      if(this.formData.email !== ""){
        if(this.formData.contact_number !== ""){
          if(this.formData.gender !== ""){
            if(this.formData.permanent_address !== ""){
              if(this.formData.temp_address !== ""){
                if(this.formData.travel_preference !== ""){
                  if(this.checkbox !== 0){
                    if(this.formData.password !== ""){
                      if(this.formData.confirm_password !== ""){
                        this.allFieldsFilled = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } 
    //end

    //if all fields are filled - start
    if(this.allFieldsFilled === false){
      mandate_fields.innerHTML = "* All fields are mandatory to fill up<br>";  
    } else { 
      //email check - start
      if(this.formData.email.includes("@")){
        if(this.formData.email.includes(".")){
        } else { 
        warn_email_el.innerHTML = "<br>* Check your email<br>";
        }
      } else { 
        warn_email_el.innerHTML = "<br>* Check your email<br>";
       }
       //email check - end
       //contact number check - start
      if(this.formData.contact_number.toString().length !== 10){
        warn_contact_number_el.innerHTML = "<br>* Contact number is not okay<br>";
      }
      //contact number check - end

      //getting all data from server - start
      this.users.getList().subscribe((result)=> {
      this.allUsers = result;
      //checking username and password exist or not - start
      for(var i = 0; i < this.allUsers.length; i++){
      if(this.allUsers[i].username === this.formData.username && this.allUsers[i].password === this.formData.password){
        resultEl.innerHTML = "<h3>User credentials already exist</h3>";
        this.userExist++;
      }
    }
    //checking username and password exist or not - end
    //checking password and confirm password match or not - start
    if(this.userExist === 0){
      resultEl.innerHTML = "";
      console.log(this.formData.confirm_password);
      if(this.formData.confirm_password === this.formData.password){
        console.log("password matched");
        this.users.saveData(this.formData).subscribe((result)=> {
          alert("User is successfully registered");
          this.router.navigate(['']);
        });
      } else {
        resultEl.innerHTML = "<h3>Retype confirm password</h3>";
      }
    }
    //checking password and confirm password match or not - end
    });
    //getting all data from server - end
    }
    //if all fields are filled - end
  }//collectData() ends 

} 

