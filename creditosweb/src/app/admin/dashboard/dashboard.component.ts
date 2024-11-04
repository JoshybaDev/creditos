import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { CustomersService } from '@services/customers.service';
import { CreditsService } from '@services/credits.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usersCount:number=0;
  customersCount:number=0;
  creditsCount:number=0;

  constructor(private readonly usersService:UsersService
    ,private readonly customersService:CustomersService
    ,private readonly creditsService:CreditsService
  ){}

  ngOnInit(): void {
    this.usersService.getCount().subscribe(usersCount => this.usersCount = usersCount);
    this.customersService.getCount().subscribe(customersCount => this.customersCount = customersCount);
    this.creditsService.getCount().subscribe(creditsCount => this.creditsCount = creditsCount);
  }

}
