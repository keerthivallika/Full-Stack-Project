import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{

users: any[] = [];
  selectedUser: any = {};  // To hold the user being edited
  errorMessage: string = '';  // Error message if something goes wrong
  successMessage: string = '';  // Success message to display on successful update

  // ViewChild for the modal reference to dismiss it
  @ViewChild('editUserModal') editUserModal: any;

  //constructor(private userService: AuthService, private modalService: NgbModal) {}
  constructor(private userService: AuthService, private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllUserDetails(); // Fetch all users on initialization
  }
    

  // Fetch all user details from backend
  getAllUserDetails(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;  // Store the response in the users array
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to load users';  // Set error message
      }
    });
  }

  // Select a user and open the modal for editing
  selectUser(user: any): void {
    this.selectedUser = { ...user };  // Clone the user object to avoid direct mutation
    this.modalService.open(this.editUserModal);  // Open the modal
  }

  // Update user details and close the modal
  updateUser(): void {
    if (!this.selectedUser.username || !this.selectedUser.email || !this.selectedUser.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.successMessage = 'User updated successfully!';  // Set success message
        this.errorMessage = '';  // Clear any existing error message
        this.modalService.dismissAll();  // Dismiss the modal after success
        this.getAllUserDetails();  // Refresh the list of users after the update
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.errorMessage = 'Failed to update user details';  // Display error message on failure
      }
    });
  }


  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.successMessage = 'User deleted successfully!';
          this.errorMessage = '';  // Clear any existing error message
          this.getAllUserDetails();  // Refresh the list of users after deletion
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Failed to delete user';  // Display error message on failure
        }
      });
    }
  }
  logout(): void {
    this.authService.logout(); // Call logout method from AuthService
  }
  
}

