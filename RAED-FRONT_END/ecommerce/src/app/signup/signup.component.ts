import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../service/myservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  succesmessage='';
  constructor(private _myService:MyserviceService) { 
    this.myForm= new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.email),
      password: new FormControl(null,Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    })
    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
  
  }


  ngOnInit(): void {

    
 
  }
  
  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

   register(): void{
     console.log(this.myForm.value)
   this._myService.submitRegister(this.myForm.value)
    .subscribe(data => this.succesmessage='Registraction succes',
              error =>  this.succesmessage='Some error'
               )
   }
}
