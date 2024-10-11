import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm : FormGroup ;
  @Output() employeeAdded = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private  fb : FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      salary: ['', []],
      address: ['', []],
      dob: ['', []],
      contactNumber: ['', [Validators.pattern(/^[0-9]{8}$/)]],
    });
  }

  ngOnInit(): void {}

  addEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeAdded.emit(newEmployee);
    } else {
      console.error("Form is not valid", this.employeeForm.errors);
    }
  }

  onCancel(){
    this.cancel.emit() ;
  }

}
