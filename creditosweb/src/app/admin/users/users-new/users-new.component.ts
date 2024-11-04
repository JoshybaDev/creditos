import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Response } from '@interfaces/response.interface';
import { Rol } from '@interfaces/rol.interface';
import { RolesService } from '@services/roles.service';
import { UsersService } from '@services/users.service';


@Component({
  selector: 'app-users-new',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectModule, NgIf],
  templateUrl: './users-new.component.html',
  styleUrl: './users-new.component.css'
})
export class UsersNewComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer) {
      
     }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(roles => this.roles = roles);
  }
  public srcImgBase: SafeResourceUrl = "img/user-placeholder.svg";
  public srcImgPerfil: SafeResourceUrl = this.srcImgBase;
  public ImgPerfilCheck: SafeResourceUrl;
  public iperfil: string
  public roles: Rol[]=[]
  public esValido: boolean = false;
  public imgTamano: boolean = false

  formUserNew = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    imgControl: ['', [Validators.required]],
    roles: [this.roles, [Validators.required]]
  });

  get email() {
    return this.formUserNew.get('email');
  }

  getRolesGenerate(roles){
    let xroles:Rol[]=[];
    let _rol: Rol;
    roles.forEach(element => {
      let _rol = {id: element.id}
      xroles.push(_rol);
    });
    return xroles;
  }

  // OnSubmit
  onSubmit(form: FormGroup) {
    if (form.valid && !this.imgTamano) {
      this.esValido = false;
      // TODO: Use EventEmitter with form value
      this.usersService.setUsersSave({
        name: this.formUserNew.get('name').value.toString() || '',
        username: this.formUserNew.get('email').value.toString() || '',
        password: this.formUserNew.get('password').value.toString() || '',
        password2: this.formUserNew.get('password2').value.toString() || '',
        iperfil: this.iperfil,
        roles: this.getRolesGenerate(this.formUserNew.get('roles').value ?? [])
      }).subscribe({
        next: (response: Response) => {
          this.router.navigate([response.redirect]);
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
  updateImageSrcPerfil(img:string) {
    this.iperfil = img;
    return  this.sanitizer.bypassSecurityTrustResourceUrl(`${img}`);
  }

  CreateBase64(file:Blob) {
    return new Promise(resolve => Object.assign(new FileReader(), { onload() { resolve(this.result) } }).readAsDataURL(file));
  }

  SeleccionarImg(event) {
    const file: File = event.target.files[0];
    this.CreateBase64(file)
      .then((img:string) => {
        this.srcImgPerfil = this.updateImageSrcPerfil(img);
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
