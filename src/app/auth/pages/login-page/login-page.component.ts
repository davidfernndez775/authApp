import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    // recuerda cambiar el email por un validador personalizado tipo expresion regular
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    // tomamos los valores del formulario
    const { email, password } = this.myForm.value;
    // enviamos los valores al servicio
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
