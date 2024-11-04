import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

import { UsersService } from '@services/users.service';
import { RolesService } from '@services/roles.service';
import { User } from '@interfaces/user.interface';
import { Response } from '@interfaces/response.interface';
import { Rol } from '@interfaces/rol.interface';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectModule, NgIf],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute) {
    this.id = parseInt(this._route.snapshot.paramMap.get('id') ?? '0');
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.id).subscribe(user => {
      this.user = user;
      this.rolesService.getRoles().subscribe(roles => {
        this.roles = roles;
        this.email?.disable();
        this.formUserUpdateData.setValue({
          email: this.user?.username ?? "",
          name: this.user?.name ?? "",
          roles: this.user?.roles ?? this.roles,
        });
        this.srcImgPerfil = this.updateImageSrcPerfil((this.user?.iperfil == null || this.user?.iperfil == '') ? this.srcImgBase : this.user?.iperfil);
      });
    });
  }
  private id: number;
  public roles: Rol[];
  public user: User;
  public esValido: Boolean = false;
  public imgTamano: Boolean = false
  public mensajeShowStatus: Boolean = false;
  public mensajeShowData: SafeHtml = "";
  public mensajeShowStatus2: Boolean = false;
  public mensajeShowData2: SafeHtml = "";
  //Imagen
  public srcImgBase: SafeResourceUrl = "img/user-placeholder.svg";
  public srcImgPerfil: SafeResourceUrl = this.srcImgBase;
  public ImgPerfilCheck: SafeResourceUrl;
  public iperfil: string | undefined

  formUserUpdatePicture = this.formBuilder.group({
    imgControl: ['', [Validators.required]],
  });

  formUserUpdateData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    roles: [this.formBuilder.array<Rol>([]), [Validators.required]]
  });

  formUserUpdatePass = this.formBuilder.group({
    passwordA: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.formUserUpdateData.get('email');
  }

  //OnSubmit
  onSubmitP(form: FormGroup) {
    if (form.valid) {
      this.usersService.setUserUpdatePhoto({
        id: this.id,
        iperfil: this.iperfil,
      }).subscribe({
        next: (response: Response) => {
          this.mensajeShowStatus = true
          this.mensajeShowData = this.mensajeSuccesError(response.msg);
          setTimeout(() => { this.mensajeShowStatus = false }, 3000);
        },
        error: (error) => {
          console.log("Error ====> ", error);
        }
      });
    }
  }
  onSubmitD(form: FormGroup) {
    if (form.valid) {
      this.usersService.setUserUpdateData({
        id: this.id,
        name: this.formUserUpdateData.get('name').value || '',
        roles: this.formUserUpdateData.get('roles').value || []
      }).subscribe({
        next: (response: Response) => {
          this.mensajeShowStatus = true
          this.mensajeShowData = this.mensajeSuccesError(response.msg);
          setTimeout(() => { this.mensajeShowStatus = false }, 3000);
        },
        error: (error) => {
          console.log("Error ====> ", error);
        }
      });
    }
  }
  onSubmitPass(form: FormGroup) {
    if (form.valid) {
      //Revisamos que las contraseñas sean iguales
      if (this.formUserUpdatePass.get('password').value != this.formUserUpdatePass.get('password2').value) {
        this.mensajeShowStatus2 = true
        this.mensajeShowData2 = this.mensajeSuccesError("Las contraseñas nuevas deben de ser iguales", false);
        setTimeout(() => { this.mensajeShowStatus2 = false }, 3000);
        return;
      }

      //Procedemos a actulizar
      this.usersService.setUserUpdatePassword({
        id: this.id,
        passwordA: this.formUserUpdatePass.get('passwordA').value.toString() || '',
        password: this.formUserUpdatePass.get('password').value.toString() || '',
        password2: this.formUserUpdatePass.get('password2').value.toString() || '',
      }).subscribe({
        next: (response: Response) => {
          if (response.code == 200) {
            this.mensajeShowStatus2 = true
            this.mensajeShowData2 = this.mensajeSuccesError(response.msg, true);
            setTimeout(() => { this.mensajeShowStatus2 = false }, 3000);
            return;
          }
          this.mensajeShowStatus2 = true
          this.mensajeShowData2 = this.mensajeSuccesError(response.msg, false);
          setTimeout(() => { this.mensajeShowStatus2 = false }, 3000);
        },
        error: (error) => {
          console.log("Error ====> ", error);
        }
      });

    }
    else {
      //El minimo de tamaño para la contraseña es de 8
      if (this.formUserUpdatePass.controls.password.errors != null) {
        const key = Object.keys(this.formUserUpdatePass.controls.password.errors);
        if (key[0] == 'minlength') {
          this.mensajeShowStatus2 = true
          this.mensajeShowData2 = this.mensajeSuccesError("Las contraseñas minimo 6 caracteres", false);
          setTimeout(() => { this.mensajeShowStatus2 = false }, 3000);
          return;
        }
      }
      this.mensajeShowStatus2 = true
      this.mensajeShowData2 = this.mensajeSuccesError("El password Actual es requerido y los passwords nuevos deben de ser iguales", false);
      setTimeout(() => { this.mensajeShowStatus2 = false }, 3000);
    }
  }

  //Revision de la imagen
  updateImageSrcPerfil(img) {
    this.iperfil = img;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${img}`);
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
        //Cargar y Guardar La Imagen en el servidor
        this.onSubmitP(this.formUserUpdatePicture);
      })
      .catch(error => console.log(error));
  }

  RevisarTamano(event) {
    this.imgTamano = false;
    const image: HTMLImageElement = document.querySelector("#srcImgPerfil");
    if (image.width > 256 && image.height > 256) {
      this.esValido = false;
      this.imgTamano = true;
      setTimeout(() => { this.srcImgPerfil = this.srcImgBase; }, 2000);

    }
  }


  mensajeSuccesError(mensaje: string, succes: Boolean = true) {
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
}
