import { Injectable } from '@angular/core';
import {globalBackEndUrl} from "../../../environment";
import {map, Observable} from "rxjs";
import {ShowVeicoloResponse} from "../dto/response/ShowVeicoloResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShowDettagliVeicoloResponse} from "../dto/response/ShowDettagliVeicoloResponse";
import {RicercaRequest} from "../dto/request/RicercaRequest";
import {ShowAppuntamentoResponse} from "../dto/response/ShowAppuntamentoResponse";
import {AppuntamentiDipendenteRequest} from "../dto/request/AppuntamentiDipendenteRequest";
import {RegistrazioneVenditaRequest} from "../dto/request/RegistrazioneVenditaRequest";
import {MessageResponse} from "../dto/response/MessageResponse";
import {ShowDettagliVeicoloManagerResponse} from "../dto/response/ShowDettagliVeicoloManagerResponse";
import {AggiungiVeicoloRequest} from "../dto/request/AggiungiVeicoloRequest";

@Injectable({
  providedIn: 'root'
})
export class VeicoloService {
  private backEndUrl: string = globalBackEndUrl + 'veicolo/';

  constructor(private http: HttpClient) { }

  getVeicoli(): Observable<ShowVeicoloResponse[]> {
    return this.http.get<ShowVeicoloResponse[]>(this.backEndUrl + 'veicoli').pipe(
      map(response => {
        return response;
      })
    );
  }

  getVeicolo(id: string): Observable<ShowDettagliVeicoloManagerResponse> {
    if(id == null || id == "" ){
        throw new Error("id non può essere nullo");
    }
    return this.http.get<ShowDettagliVeicoloManagerResponse>(this.backEndUrl + 'dettagli/' + id);
  }

  ricerca(
    criterio: string,
    targa: string,
    marca: string,
    modello: string,
    potenzaMinima: number,
    potenzaMassima: number,
    prezzoMinimo: number,
    prezzoMassimo: number,
    alimentazione: string,
    annoProduzioneMinimo: number,
    annoProduzioneMassimo: number,
    chilometraggioMinimo: number,
    chilometraggioMassimo: number
  ): Observable<ShowVeicoloResponse[]> {
    const token: HttpHeaders = this.recuperaToken();
    const request: RicercaRequest = {
      criterio,
      targa,
      marca,
      modello,
      potenzaMinima,
      potenzaMassima,
      prezzoMinimo,
      prezzoMassimo,
      alimentazione,
      annoProduzioneMinimo,
      annoProduzioneMassimo,
      chilometraggioMinimo,
      chilometraggioMassimo
    };
    return this.http.post<ShowVeicoloResponse[]>(this.backEndUrl + 'cerca', request, {headers: token});
  }

  registraVendita(idAppuntamento: number, venditaConclusa: boolean): Observable<MessageResponse>{
    const token: HttpHeaders = this.recuperaToken();
    const request: RegistrazioneVenditaRequest = {
        idAppuntamento,
        venditaConclusa
    }
    return this.http.post<MessageResponse>(this.backEndUrl + 'registraVendita', request, {headers: token});
  }

  getAllVeicoliConDettagli(): Observable<ShowDettagliVeicoloManagerResponse[]> {
    const token: HttpHeaders = this.recuperaToken();
    return this.http.get<ShowDettagliVeicoloManagerResponse[]>(this.backEndUrl + 'veicoliConDettagli', {headers: token});
  }

  eliminaVeicolo(id: number): Observable<MessageResponse> {
    const token: HttpHeaders = this.recuperaToken();
    return this.http.delete<MessageResponse>(this.backEndUrl + 'elimina/' + id, {headers: token});
  }

  modificaVeicolo(veicolo: ShowDettagliVeicoloResponse) {
    const token: HttpHeaders = this.recuperaToken();
    return this.http.put<MessageResponse>(this.backEndUrl + 'modifica/' + veicolo.id.toString(), veicolo, {headers: token});
  }

  aggiungiVeicolo(
    targa: string,
    marca: string,
    modello: string,
    chilometraggio: number,
    annoProduzione: number,
    potenzaCv: number,
    alimentazione: string,
    prezzo: number,
    fileSelezionato: any) : Observable<MessageResponse> {
    const token: HttpHeaders = this.recuperaToken();
    const formData = new FormData();
    formData.append("targa", targa);
    formData.append("marca", marca);
    formData.append("modello", modello);
    formData.append("chilometraggio", chilometraggio.toString());
    formData.append("annoProduzione", annoProduzione.toString());
    formData.append("potenzaCv", potenzaCv.toString());
    formData.append("alimentazione", alimentazione);
    formData.append("prezzo", prezzo.toString());
    formData.append("immagine", fileSelezionato);

    return this.http.post<MessageResponse>(this.backEndUrl + 'aggiungiVeicolo', formData, {headers: token});
  }

  getVeicoliDisponibili() {
    const token: HttpHeaders = this.recuperaToken();
    return this.http.get<ShowDettagliVeicoloManagerResponse[]>(this.backEndUrl + 'veicoliDisponibili', {headers: token}).pipe(
      map(response => {
        return response;
      })
    );
  }

  private recuperaToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({'Authorization': 'Bearer ' + token})
  }

  getVeicoliDisponibiliESelezionato(idAppuntamento: number) {
    const token: HttpHeaders = this.recuperaToken();
    return this.http.get<ShowDettagliVeicoloManagerResponse[]>(this.backEndUrl + 'veicoliDisponibiliESelezionato/' + idAppuntamento, {headers: token}).pipe(
      map(response => {
        return response;
      })
    );
  }
}
