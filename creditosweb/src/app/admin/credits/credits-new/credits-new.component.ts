import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-credits-new',
  standalone: true,
  imports: [NgIf],
  templateUrl: './credits-new.component.html',
  styleUrl: './credits-new.component.css'
})
export class CreditsNewComponent {
  mensajeShowData:"";
  mensajeShowStatus:"";
}
