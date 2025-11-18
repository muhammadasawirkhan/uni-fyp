import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgForOf, NgClass, TitleCasePipe } from '@angular/common';
import { UserService, User } from '../../../services/user'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf, NgClass, TitleCasePipe],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {
  addUserForm: FormGroup;
  users: User[] = [];
  isAddUserModalOpen = false;

  // ADD THIS
  currentStep = 0;
  steps = ['Basic Info', 'Account', 'Role & Status', 'Contact', 'Review'];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.addUserForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      title:['',Validators.required],
      NPI:['',Validators.required,Validators.minLength(5),Validators.maxLength(5)],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['active', Validators.required],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit() {
    this.users = this.userService.getUsers(); // load users when component starts
  }

  // modal & step methods
  openAddUserModal() { this.isAddUserModalOpen = true; this.currentStep = 0; }
  closeAddUserModal() { this.isAddUserModalOpen = false; }
  nextStep() { if (this.currentStep < this.steps.length - 1) this.currentStep++; }
  prevStep() { if (this.currentStep > 0) this.currentStep--; }

  submitAddUser() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    this.userService.addUser(this.addUserForm.value);
    this.users = this.userService.getUsers(); // refresh table
    this.addUserForm.reset({ status: 'active' });
    this.closeAddUserModal();
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'status-badge active' : 'status-badge inactive';
  }
}

