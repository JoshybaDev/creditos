import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@interfaces/customer.interface';
import { Response } from '@interfaces/response.interface';
import { CustomersService } from '@services/customers.service';

@Component({
  selector: 'app-customers-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './customers-edit.component.html',
  styleUrl: './customers-edit.component.css'
})
export class CustomersEditComponent implements OnInit {
  constructor(
    private router: Router,
    private customersService: CustomersService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
  ) {
    this.id = parseInt(this._route.snapshot.paramMap.get('id') ?? '0');
  }


  ngOnInit(): void {
    this.customersService.getCustomerById(this.id).subscribe(customer => {
      this.customer = customer;
      if (this.customer.type == 'F') {
        this.xPF = true;
      } else {
        this.xPM = true;
      }

      this.formCustomerUpdateData.setValue({
        name: this.customer?.name ?? "",
        lastName: this.customer?.lastName ?? "",
        tradeName: this.customer?.tradeName ?? "",
        rfc: this.customer?.rfc ?? "",
        email: this.customer?.email ?? "",
        phone: this.customer?.phone ?? "",
      });
    });
  }

  private id: number;
  public customer: Customer;
  public noEsValido: boolean = false;
  public xPF: boolean = false;
  public xPM: boolean = false;
  public mensajeShowStatus: boolean = false;
  public mensajeShowData: SafeHtml = "";


  formCustomerUpdateData = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    tradeName: ['', [Validators.required]],
    rfc: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
  });


  get name() {
    return this.formCustomerUpdateData.get('name');
  }
  get lastName() {
    return this.formCustomerUpdateData.get('lastName');
  }
  get tradeName() {
    return this.formCustomerUpdateData.get('tradeName');
  }
  get rfc() {
    return this.formCustomerUpdateData.get('rfc');
  }
  get phone() {
    return this.formCustomerUpdateData.get('phone');
  }
  get email() {
    return this.formCustomerUpdateData.get('email');
  }



  onSubmitD(form: FormGroup) {
    if (this.customer.type == 'M' && this.formCustomerUpdateData.get('tradeName').value.toString() == '') {
      this.noEsValido = true;
      return;
    }

    if (this.customer.type == 'F' && (this.formCustomerUpdateData.get('name').value.toString() == '' || this.formCustomerUpdateData.get('lastName').value.toString() == '')) {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerUpdateData.get('rfc').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerUpdateData.get('email').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    if (this.formCustomerUpdateData.get('phone').value.toString() == '') {
      this.noEsValido = true;
      return;
    }
    this.noEsValido = false;

    this.customersService.setUserUpdateData({
      id: this.id,
      name: this.formCustomerUpdateData.get('name').value || '',
      lastName: this.formCustomerUpdateData.get('lastName').value || '',
      tradeName: this.formCustomerUpdateData.get('tradeName').value || '',
      rfc: this.formCustomerUpdateData.get('rfc').value || '',
      email: this.formCustomerUpdateData.get('email').value || '',
      phone: this.formCustomerUpdateData.get('phone').value || '',
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
