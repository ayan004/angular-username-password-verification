import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor( private usersService: UsersService ) { }

  users: any;
  p: number = 1;
  searchWord: any;

  ngOnInit(): void {
    this.usersService.getList().subscribe((result) => {
      this.users = result;
    });
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  search(){
    if(this.searchWord === ""){
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { username: string; email: string; gender: string; permanent_address: string; temp_address: string; travel_preference: string; contact_number: string; }) => {
        return (
        res.username?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) || 
        res.email?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) ||
        res.gender?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) ||
        res.permanent_address?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) ||
        res.temp_address?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) ||
        res.travel_preference?.toLocaleLowerCase().match(this.searchWord.toLocaleLowerCase()) ||
        res.contact_number?.match(this.searchWord) 
        );
      })
    }
  }
}
