import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../core/interfaces/login.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

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
          if (response.code == 200) {
            sessionStorage.setItem('token', response.accessToken);
            sessionStorage.setItem('name', response.name);
            sessionStorage.setItem('rol', response.rol);
            sessionStorage.setItem('iperfil', response.iperfil);
            this.router.navigate([response.redirect]);
          }
        },
        error: (error) => {
          if(error.status==400) {
            this.mensajeShowStatus = true
            this.mensajeShowData = this.mensajeSuccesError(error.error.msg, false);
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