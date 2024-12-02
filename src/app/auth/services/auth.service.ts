import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStatus, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // importamos la url del endpoint
  private readonly baseUrl: string = environment.baseUrl;
  // inyectamos el servicio http para las peticiones
  private http = inject(HttpClient);
  // variable para guardar el usuario actual, se recomienda usar null
  // en lugar de undefined
  private _currentUser = signal<User | null>(null);
  // variable para guardar el estado de autenticacion
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    return of(true);
  }
}
