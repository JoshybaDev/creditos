import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {

  constructor(private router: Router){}

  cerrarSesion() {
    this.router.navigate(['/']);
    sessionStorage.clear();
  }

}
