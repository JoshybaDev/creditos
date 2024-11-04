import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgIf } from '@angular/common';

import { CustomersService } from '@services/customers.service';
import { Router } from "@angular/router";
import { Response } from '@interfaces/response.interface';
import { TipoP } from '@interfaces/tipop.interface';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-customers-new',
  standalone: true,
  imports: [ReactiveFormsModule, SelectButtonModule, NgIf],
  templateUrl: './customers-new.component.html',
  styleUrl: './customers-new.component.css'
})
export class CustomersNewComponent implements OnInit {



  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    let xtipo1: TipoP;
    let xtipo2: TipoP;
    xtipo1 = { value: 'F', name: 'Persona Física' }
    xtipo2 = { value: 'M', name: 'Persona Moral' }
    this.tiposP.push(xtipo1);
    this.tiposP.push(xtipo2);
  }
  public tiposP: TipoP[] = [];
  public xPF: boolean = false;
  public xPM: boolean = false;
  public noEsValido: boolean = false;

  formCustomerNew = this.formBuilder.group({
    tipoPersona: [this.tiposP, [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    tradeName: ['', [Validators.required]],
    rfc: ['', [Validators.required, Validators.minLength(13)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
  });

  get name() {
    return this.formCustomerNew.get('name');
  }
  get lastName() {
    return this.formCustomerNew.get('lastName');
  }
  get tradeName() {
    return this.formCustomerNew.get('tradeName');
  }
  get rfc() {
    return this.formCustomerNew.get('rfc');
  }
  get phone() {
    return this.formCustomerNew.get('phone');
  }
  get email() {
    return this.formCustomerNew.get('email');
  }

  // OnSubmit
  onSubmit(form: FormGroup) {
    if (this.formCustomerNew.get('tipoPersona').value.toString() == 'M' && this.formCustomerNew.get('tradeName').value.toString() == '') {
      this.noEsValido = true;
      return;
    }

    if (this.formCustomerNew.get('tipoPersona').value.toString() == 'F' && (this.formCustomerNew.get('name').value.toString() == '' || this.formCustomerNew.get('lastName').value.toString() == '')) {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerNew.get('rfc').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerNew.get('email').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerNew.get('phone').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    this.noEsValido = false;
    this.customersService.setCustomerSave({
      type: this.formCustomerNew.get('tipoPersona').value.toString() || '',
      name: this.formCustomerNew.get('name').value.toString() || '',
      lastName: this.formCustomerNew.get('lastName').value.toString() || '',
      tradeName: this.formCustomerNew.get('tradeName').value.toString() || '',
      rfc: this.formCustomerNew.get('rfc').value.toString() || '',
      email: this.formCustomerNew.get('email').value.toString() || '',
      phone: this.formCustomerNew.get('phone').value.toString() || '',
    }).subscribe({
      next: (response: Response) => {
        this.router.navigate([response.redirect]);
      },
      error: (error) => {
        console.log("Error ====> ", error);
      }
    });
  }
  CambiarTipo(event) {
    if (event.value == 'F') {
      this.xPF = true;
      this.xPM = false;
    }
    if (event.value == 'M') {
      this.xPM = true;
      this.xPF = false;
    }
  }
}
