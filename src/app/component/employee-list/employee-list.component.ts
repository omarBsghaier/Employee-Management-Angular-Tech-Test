import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/models/employee';
import {EmployeeService} from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  currentPage: number = 0 ;
  itemsPerPage: number = 10;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchTerm: string = '';
  showEmployeeForm : boolean = false ;
  showSuccessAlert :boolean  = false ;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => console.error(err)
    });
  }

  onEmployeeAdded(newEmployee: Employee): void {
    this.employees.push(newEmployee);
    this.hideForm();
    this.alertSuccess();
  }

  deleteEmployee( id :number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      this.employees = this.employees.filter(employee => employee.id !== id);
    }
  }

  changeItemsPerPage(count: number): void {
    this.itemsPerPage = count;
  }

  sortColumn(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.employees.sort((a, b) => this.compare(a, b, column));
  }

  compare(a: any, b: any, column: string): number {
    const valueA = a[column];
    const valueB = b[column];
    if (valueA == null && valueB == null) {
      return 0;
    }
    if (valueA == null) {
      return this.sortDirection === 'asc' ? -1 : 1;
    }
    if (valueB == null) {
      return this.sortDirection === 'asc' ? 1 : -1;
    }
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return this.sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return this.sortDirection === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    }
    return this.sortDirection === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  }

  hideForm() {
    this.showEmployeeForm = false;
  }

  alertSuccess(){
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 2500);
  }

}
