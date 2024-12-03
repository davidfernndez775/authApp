import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // *variables internas del servicio
  // importamos la url del endpoint
  private readonly baseUrl: string = environment.baseUrl;
  // inyectamos el servicio http para las peticiones
  private http = inject(HttpClient);
  // variable para guardar el usuario actual, se recomienda usar null
  // en lugar de undefined
  private _currentUser = signal<User | null>(null);
  // variable para guardar el estado de autenticacion
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  // *variables al mundo exterior
  // creamos una variable publica que tome el valor del usuario, se usa computed
  // para que su valor dependa exclusivamente de la variable privada. Nadie puede
  // redefinirla por su cuenta
  public currentUser = computed(() => this._currentUser());
  // mismo procedimiento con la variable authStatus
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email: email, password: password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        // cuando se asignen los valores automaticamente se sobreescriben las variables
        // privadas y luego las publicas
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        // guardamos el token
        localStorage.setItem('token', token);
        console.log({ user, token });
      }),
      map(() => true),
      // todo: errores
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
