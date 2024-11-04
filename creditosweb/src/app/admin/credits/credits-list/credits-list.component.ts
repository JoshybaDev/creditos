import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


import { Credits } from '@interfaces/credit.interface';
import { AuthService } from '@services/auth.service';
import { CreditsService } from '@services/credits.service';

@Component({
  selector: 'app-credits-list',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf,CurrencyPipe],
  templateUrl: './credits-list.component.html',
  styleUrl: './credits-list.component.css'
})
export class CreditsListComponent implements OnInit{
  constructor(private readonly creditService: CreditsService,
    private readonly authService: AuthService,  
  ) { }
  ngOnInit(): void {
    this.creditService.getCredits().subscribe(credits => this.credits = credits);
  }

  public credits: Credits[] = [];
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
