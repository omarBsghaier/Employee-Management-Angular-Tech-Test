export class Employee {
  id: number;
  age: number;
  dob: string;
  email: string;
  salary: string;
  address: string;
  imageUrl: string;
  lastName: string;
  firstName: string;
  contactNumber: string;

  constructor(
    id: number,
    age: number,
    dob: string,
    email: string,
    salary: string,
    address: string,
    imageUrl: string,
    lastName: string,
    firstName: string,
    contactNumber: string
  ) {
    this.id = id;
    this.age = age;
    this.dob = dob;
    this.email = email;
    this.salary = salary;
    this.address = address;
    this.imageUrl = imageUrl;
    this.lastName = lastName;
    this.firstName = firstName;
    this.contactNumber = contactNumber;
  }

}
