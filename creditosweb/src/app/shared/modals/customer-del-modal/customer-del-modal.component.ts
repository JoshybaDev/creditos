import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-del-modal',
  standalone: true,
  imports: [],
  templateUrl: './customer-del-modal.component.html',
  styleUrl: './customer-del-modal.component.css'
})
export class CustomerDelModalComponent {

  @Input() id: number;
  @Input() customer: string;

  DesactivarClienteYa(){}
}
