import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  validateForm!: FormGroup;
  isSpinning = false;

  confirmationValidator = (control: FormControl): { [s: string]:boolean } => {
    if(!control.value){
      return{ required:true}
    }else if(control.value !== this.validateForm.controls['password'].value){
      return { confirm:true, error:true}
    }
    return {}
  }

  constructor(private fb: FormBuilder){

  }
  ngOnInit(){
    this.validateForm = this.fb.group({
      name: [null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required, this.confirmationValidator]]
    })
  }
  
  register(){
    console.log(this.validateForm.value)
  }
}
