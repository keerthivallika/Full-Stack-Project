import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    if (!this.username || !this.password || !this.email) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    const user = { username: this.username, password: this.password, email: this.email };

    this.authService.registerUser(user).subscribe({
      next: (response: string) => {  // Expecting a string response
        console.log('Backend Response:', response);

        if (response === 'User registered successfully') {
          this.successMessage = response;
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        console.error('Registration Error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      },
    });
}
}
