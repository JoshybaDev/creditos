import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginResponse } from '../../core/interfaces/login.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["dashboard"]);
    }
  }

  public mensajeShowStatus: boolean = false;
  public mensajeShowData: SafeHtml = "";
  public mensajeEmailError: SafeHtml = "";
  public mensajePasswordError: SafeHtml = "";

  formlogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  onSubmit(form: FormGroup) {
    if (form.valid) {
      // TODO: Use EventEmitter with form value
      //console.warn("Data ====> ", this.formUserNew.value);
      this.authService.setLogin({
        username: this.formlogin.get('email')?.value?.toString() ?? '',
        password: this.formlogin.get('password')?.value?.toString() ?? '',
      }).subscribe({
        next: (response: LoginResponse) => {
          this.authService.createSession(response);
        },
        error: (error) => {
          if (error.status == 400) {
            this.mensajeShowStatus = true
            this.mensajeShowData = this.mensajeSuccesError(error.error.msg, false);
            setTimeout(() => { this.mensajeShowStatus = false }, 3000);
          } else {
            this.mensajeShowStatus = true
            this.mensajeShowData = this.mensajeSuccesError("Error de Servidor", false);
            setTimeout(() => { this.mensajeShowStatus = false }, 3000);
          }
        }
      });
    }
    else {
      this.mensajeEmailError = this.mensajeSuccesError(this.checkErrors(form.get('email')?.errors), false);
      this.mensajePasswordError = this.mensajeSuccesError(this.checkErrors(form.get('password')?.errors), false);
    }
  }

  mensajeSuccesError(mensaje: string, succes: boolean = true): SafeHtml {
    let tipo: string = succes == true ? 'success' : 'danger';
    if (mensaje == "")
      return "";

    return this.sanitizer.bypassSecurityTrustHtml(`
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
    ${mensaje}
    <button class="btn-close" type="button" data-dismiss="alert" aria-label="Close"></button>
    </div>
    `);
  }



  checkErrors(errors?: ValidationErrors | null): string {
    if (!errors) {
      return "";
    }

    const errorsList = Object.keys(errors);

    if (errorsList.includes('required')) {
      return 'Este campo es requerido.';
    }

    if (errorsList.includes('minlength')) {
      const min = errors!['minlength']['requiredLength'];
      const current = errors!['minlength']['actualLength'];
      return `Mínimo ${current}/${min} caracteres.`;
    }

    if (errorsList.includes('email')) {
      return 'No tiene formato de correo.';
    }
    return "";
  }


}