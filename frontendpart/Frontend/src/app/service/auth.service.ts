import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

 // Register User
 registerUser(user: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/register`, user, { responseType: 'text' as 'json' });
}

// Login User
loginUser(username: string, password: string): Observable<{ message: string }> {
    // Make sure the backend is expecting 'username' and 'password' as request parameters
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<{ message: string }>(`${this.apiUrl}/login`, null, { params });
}



  // Get user details by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Update user details
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Delete user by ID
deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

// Logout User
logout(): void {
  localStorage.removeItem('authToken'); // Clear authentication token
  window.location.href = '/login'; // Redirect to login page
}

}
