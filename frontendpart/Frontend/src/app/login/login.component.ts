import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
    onLogin(): void {
      if (!this.username || !this.password) {
        this.errorMessage = 'Please enter both username and password';
        return;
      }
  
      this.authService.loginUser(this.username, this.password).subscribe({
        next: (response: { message: string }) => {
          // Make sure the response contains a 'message' property
          console.log('Backend Response:', response);
  
          if (response.message === 'Login successful') {
            this.loginMessage = response.message;
            this.router.navigate(['/user-details']); // Navigate to the dashboard or home page
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        error: (error) => {
          console.error('Login Error:', error);
          this.errorMessage = 'Login failed. Please try again.';
        },
      });
    }
 
}
