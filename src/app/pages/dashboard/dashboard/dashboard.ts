import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';

interface User {
  id: number;
  fullName: string;
  email: string;
  username: string;
  role: string;
  status: string;
  phone?: string;
  address?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,NgIf,NgForOf,NgClass,TitleCasePipe],
  templateUrl: './dashboard.html',
  styleUrl:'./dashboard.scss'
})
export class DashboardComponent {
  isAddUserModalOpen = false;

  currentStep = 0;
  steps = ['Basic Info', 'Account', 'Role & Status', 'Contact', 'Review'];

  addUserForm: FormGroup;

  // 🧑‍🤝‍🧑 Here we store all added users
  users: User[] = [];
  private nextId = 1;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      // Step 1
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      // Step 2
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      // Step 3
      role: ['', Validators.required],
      status: ['active', Validators.required],

      // Step 4
      phone: [''],
      address: [''],
    });
  }

  openAddUserModal() {
    this.isAddUserModalOpen = true;
    this.currentStep = 0;
  }

  closeAddUserModal() {
    this.isAddUserModalOpen = false;
  }

  nextStep() {
    // simple per-step validation
    if (this.currentStep === 0) {
      if (
        this.addUserForm.get('fullName')?.invalid ||
        this.addUserForm.get('email')?.invalid
      ) {
        this.addUserForm.get('fullName')?.markAsTouched();
        this.addUserForm.get('email')?.markAsTouched();
        return;
      }
    }

    if (this.currentStep === 1) {
      if (
        this.addUserForm.get('username')?.invalid ||
        this.addUserForm.get('password')?.invalid
      ) {
        this.addUserForm.get('username')?.markAsTouched();
        this.addUserForm.get('password')?.markAsTouched();
        return;
      }
    }

    if (this.currentStep === 2) {
      if (
        this.addUserForm.get('role')?.invalid ||
        this.addUserForm.get('status')?.invalid
      ) {
        this.addUserForm.get('role')?.markAsTouched();
        this.addUserForm.get('status')?.markAsTouched();
        return;
      }
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitAddUser() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    const formValue = this.addUserForm.value;

    const newUser: User = {
      id: this.nextId++,
      fullName: formValue.fullName,
      email: formValue.email,
      username: formValue.username,
      role: formValue.role,
      status: formValue.status,
      phone: formValue.phone,
      address: formValue.address,
    };

    // Add to table
    this.users.push(newUser);

    console.log('User submitted:', newUser);

    this.closeAddUserModal();
    this.addUserForm.reset({
      status: 'active',
    });
  }

  // (optional) helper to show status badge classes in HTML
  getStatusClass(status: string): string {
    return status === 'active' ? 'status-badge active' : 'status-badge inactive';
  }
  // constructor(public auth: AuthService) {}
}
