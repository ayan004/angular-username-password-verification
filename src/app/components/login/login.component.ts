import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  collectData(){
    var resultEl = document.getElementById("resultEl")!;
    this.users.getDataByName_Pass(this.loginForm.value.username, this.loginForm.value.password).subscribe((result: any)=> {
      if(result.length === 0 ){
        resultEl.innerHTML = "<h3>User credentials not valid</h3>";
      } else {
        this.loginForm.reset({});
        this.router.navigate(['dashboard']);
      }
    });
  }

}
