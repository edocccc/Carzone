import { Component } from '@angular/core';
import {VeicoloService} from "../../services/veicolo.service";
import {ShowVeicoloResponse} from "../../dto/response/ShowVeicoloResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent {
  veicoli: ShowVeicoloResponse[] = [];
  ricercaEffettuata: boolean = false;

  criterio: string = "";
  targa: string = "";
  marca: string = "";
  modello: string = "";
  potenzaMinima: number = 0;
  potenzaMassima: number = 0;
  prezzoMinimo: number = 0;
  prezzoMassimo: number = 0;
  alimentazione: string = "";
  annoProduzioneMinimo: number = 0;
  annoProduzioneMassimo: number = 0;
  chilometraggioMinimo: number = 0;
  chilometraggioMassimo: number = 0;

  constructor(private veicoloService: VeicoloService, private router: Router) { }

  ricerca() {
    this.veicoloService.ricerca(
      this.criterio,
      this.targa,
      this.marca,
      this.modello,
      this.potenzaMinima,
      this.potenzaMassima,
      this.prezzoMinimo,
      this.prezzoMassimo,
      this.alimentazione,
      this.annoProduzioneMinimo,
      this.annoProduzioneMassimo,
      this.chilometraggioMinimo,
      this.chilometraggioMassimo
    ).subscribe({
      next: (response) => {
        this.veicoli = response;
        this.ricercaEffettuata = true;
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.veicoli = [];
      },
    });
    }

  redirectHomepageCliente() {
    this.router.navigate(['homeCliente/']);
  }
}
