import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { LogoutModalComponent } from '../../shared/modals/logout-modal/logout-modal.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,SidebarComponent,NavComponent,LogoutModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
