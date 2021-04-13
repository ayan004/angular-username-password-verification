import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(this.url);
  }

  saveData(data: any){
    return this.http.post(this.url, data);
  }

  getDataByName_Pass(name: any, pass: any){
    return this.http.get(`${this.url}?username=${name}&password=${pass}`);
  }

}
