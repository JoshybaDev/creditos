import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/users.interface';
import { UsersService } from '../../../core/services/users.service';
import {NgFor, NgIf} from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UserDelModalComponent } from '../../../shared/modals/user-del-modal/user-del-modal.component';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor,RouterLink,UserDelModalComponent,NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  public users:User[]=[];
  constructor(private usersService:UsersService){}
  
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  idSelected:number;
  nombreSelected:string;

  SetSelectemItem(id:number,name:string){
    this.idSelected=id;
    this.nombreSelected=name;
  }

  public getEsAdmin(){
    return sessionStorage.getItem('rol')=="ADMIN"
  }
}
