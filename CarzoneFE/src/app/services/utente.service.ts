import { Injectable } from '@angular/core';
import { globalBackEndUrl } from 'environment';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../dto/request/RegisterRequest';
import { LoginRequest } from '../dto/request/LoginRequest';
import {BehaviorSubject, Observable} from 'rxjs';
import { MessageResponse } from '../dto/response/MessageResponse';
import {LoginResponse} from "../dto/response/LoginResponse";

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  private backEndUrl: string = globalBackEndUrl + 'utente/';
  private isAuthenticatedSource = new BehaviorSubject<boolean>(this.checkIsAuthenticatedInitial());
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();

  constructor(private http: HttpClient) {}

  registra(
    email: string,
    nome: string,
    cognome: string,
    dataNascita: Date,
    username: string,
    password: string,
    passwordRipetuta: string
  ): Observable<MessageResponse> {
    const request: RegisterRequest = {
      email,
      nome,
      cognome,
      dataNascita,
      username,
      password,
      passwordRipetuta,
    };
    return this.http.post<MessageResponse>(this.backEndUrl + 'signup', request);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = {
      username,
      password,
    };
    this.setIsAuthenticated(true);
    return this.http.post<LoginResponse>(this.backEndUrl + 'login', request);
  }

  accessoEffettuato(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.setIsAuthenticated(false);
    localStorage.clear();
  }

  private checkIsAuthenticatedInitial(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Restituisce true se token esiste, altrimenti false
  }

  // Usato per accedere allo stato corrente in un modo reattivo
  checkIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticatedSource.next(value);
  }
}
