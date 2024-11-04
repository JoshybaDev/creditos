import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Customer } from '@interfaces/customer.interface';
import { AuthService } from '@services/auth.service';
import { CustomersService } from '@services/customers.service';
import { CustomerDelModalComponent } from '@modals/customer-del-modal/customer-del-modal.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [NgFor, RouterLink, CustomerDelModalComponent, NgIf],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {

  public customers: Customer[] = [];

  constructor(private readonly customersService: CustomersService,
     private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe(customers => this.customers = customers);
  }

  idSelected: number;
  nombreSelected: string;

  SetSelectemItem(id: number, name?: string) {
    this.idSelected = id;
    this.nombreSelected = name;
  }

  getEsAdmin() {
    return this.authService.getEsAdmin();
  }
}
