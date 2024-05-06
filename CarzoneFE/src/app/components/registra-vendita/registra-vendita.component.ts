import { Component } from '@angular/core';
import {AppuntamentoService} from "../../services/appuntamento.service";
import {VeicoloService} from "../../services/veicolo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registra-vendita',
  templateUrl: './registra-vendita.component.html',
  styleUrls: ['./registra-vendita.component.css']
})
export class RegistraVenditaComponent {
  idAppuntamento: number = +this.router.url.split('/')[2];
  venditaConclusa: boolean = false;

  constructor(private veicoloService: VeicoloService, private router: Router) { }


  registraVendita() {
    this.veicoloService.registraVendita(this.idAppuntamento, this.venditaConclusa).subscribe({
      next: () => {
        alert('Esito della vendita registrato con successo');
      },
      error: () => {
        alert('Errore durante la registrazione della vendita');
      }
    });
  }
}
