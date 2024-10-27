import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { UserResponse } from '../../../core/interfaces/users.interface';

@Component({
  selector: 'app-user-del-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-del-modal.component.html',
  styleUrl: './user-del-modal.component.css'
})
export class UserDelModalComponent {
  constructor(private usersService: UsersService
  ) { }
  @Input() id: number;
  @Input() user: string;

  EliminarUsuarioYa() {
    this.usersService.setUserDeleteById(this.id)
      .subscribe({
        next: (response: UserResponse) => {
          if (response.code == 200)
            window.location.reload();
        },
        error: (error) => {
          console.log("Error ====> ", error);
        }
      });
  }
}
