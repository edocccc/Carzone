import { Component } from '@angular/core';
import { RegisterRequest } from 'src/app/dto/request/RegisterRequest';
import { UtenteService } from 'src/app/services/utente.service';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
})
export class RegistrazioneComponent {
  protected email: string = '';
  protected nome: string = '';
  protected cognome: string = '';
  protected dataNascita: Date = new Date();
  protected username: string = '';
  protected password: string = '';
  protected passwordRipetuta: string = '';

  constructor(private utenteService: UtenteService) {}

  registra(): void {
    this.utenteService
      .registra(
        this.email,
        this.nome,
        this.cognome,
        this.dataNascita,
        this.username,
        this.password,
        this.passwordRipetuta
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
        },
      });
  }
}
