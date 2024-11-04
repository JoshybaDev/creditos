import { Component, OnInit } from '@angular/core';
import {JsonPipe, NgFor, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserDelModalComponent } from '@modals/user-del-modal/user-del-modal.component';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { User } from '@interfaces/user.interface';



@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor,RouterLink,UserDelModalComponent,NgIf,JsonPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  public users:User[]=[];
  constructor(private usersService:UsersService,private authSetvice:AuthService){
  }
  
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  idSelected:number;
  nombreSelected:string;

  SetSelectemItem(id:number,name:string){
    this.idSelected=id;
    this.nombreSelected=name;
  }

  getEsAdmin(){
    return this.authSetvice.getEsAdmin();
  }  
}
