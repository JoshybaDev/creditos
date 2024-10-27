import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { UserResponse } from '../../../core/interfaces/users.interface';
import { Rol } from '../../../core/interfaces/roles.interface';
import { RolesService } from '../../../core/services/roles.service';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-users-new',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, NgIf],
  templateUrl: './users-new.component.html',
  styleUrl: './users-new.component.css'
})
export class UsersNewComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(roles => this.roles = roles);
  }
  public srcImgBase: SafeResourceUrl = "img/user-placeholder.svg";
  public srcImgPerfil: SafeResourceUrl = this.srcImgBase;
  public ImgPerfilCheck: SafeResourceUrl;
  public iperfil: string
  public roles: Rol[]
  public esValido: Boolean = false;
  public imgTamano: Boolean = false

  formUserNew = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    imgControl: ['', [Validators.required]],
    rol: ['', [Validators.required]]
  });

  get email() {
    return this.formUserNew.get('email');
  }

  // OnSubmit
  onSubmit(form: FormGroup) {
    if (form.valid && this.imgTamano==false) {
      this.esValido = false;
      // TODO: Use EventEmitter with form value
      //console.warn("Data ====> ", this.formUserNew.value);
      this.usersService.setUsersSave({
        name: this.formUserNew.get('name').value.toString() || '',
        username: this.formUserNew.get('email').value.toString() || '',
        password: this.formUserNew.get('password').value.toString() || '',
        password2: this.formUserNew.get('password2').value.toString() || '',
        iperfil: this.iperfil,
        rol: this.formUserNew.get('rol').value || ''
      }).subscribe({
        next: (response: UserResponse) => {
          this.router.navigate([response.msg]);
        },
        error: (error) => {
          console.log("Error ====> ", error);
        }
      });
    } else {
      this.esValido = true;
    }
  }

  //Revision de la imagen
  updateImageSrcPerfil(img) {
    this.iperfil = img;
    return  this.sanitizer.bypassSecurityTrustResourceUrl(`${img}`);
  }

  CreateBase64(file) {
    return new Promise(resolve => Object.assign(new FileReader(), { onload() { resolve(this.result) } }).readAsDataURL(file));
  }

  SeleccionarImg(event) {
    const file: File = event.target.files[0];
    this.CreateBase64(file)
      .then(x => {
        this.srcImgPerfil = this.updateImageSrcPerfil(x);
        this.ImgPerfilCheck = this.srcImgPerfil;
      })
      .catch(error => console.log(error));
  }

  RevisarTamano(event) {
    this.imgTamano = false;
    const image: HTMLImageElement = document.querySelector("#srcImgPerfil");
    if (image.width > 256 && image.height > 256) {
      this.esValido = false;
      this.imgTamano = true;
      setTimeout(()=>{this.srcImgPerfil = this.srcImgBase;},2000);
    }
  }
}
