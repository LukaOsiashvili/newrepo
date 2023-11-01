import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from './password-validator';
import { forbiddenNameValidator,} from './user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  registrationForm!: FormGroup;

 
  

  get UserName(){
    return this.registrationForm.get('username');
  }
  
  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(){
    this.alternateEmails.push(this.fb.control(''))
  }

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
  this.registrationForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    email: [''],
    subscribe: [false],
    password: [""],
    confirmPassword: [""],
    address: this.fb.group({
      city: [''],
      state:[''],
      postalCode: ['']
    }),
    alternateEmails: this.fb.array([]) 
  },
    
    {Validator: PasswordValidator});

    this.registrationForm.get('subscribe')?.valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email?.setValidators(Validators.required)
      }
      else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    })
  };


  // registrationForm = new FormGroup ({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  
  
  loadApiData(){

    this.registrationForm.patchValue({
      username: 'Luka',
      password: '123',
      confirmPassword: '123',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456789'
      }
    })

  }

}
