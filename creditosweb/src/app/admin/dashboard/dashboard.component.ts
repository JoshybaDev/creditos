import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usersCount:number=0;

  constructor(private usersService:UsersService){}

  ngOnInit(): void {
    this.usersService.getCount().subscribe(usersCount => this.usersCount = usersCount);
  }

}
