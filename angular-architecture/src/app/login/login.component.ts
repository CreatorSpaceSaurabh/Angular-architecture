import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/common/auth.service';

@Component({
  selector: 'app-login',
  // standalone: false,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showPass: boolean = false;
  passwordType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern(
            /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/
          ),
        ],
      ],
    });
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    try {
      this.submitted = true;

      if (this.loginForm.invalid) {
        alert('Form details are invalid');
        return;
      }

      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.code == 200) {
          this.toastr.success('Login successfull');
          const userData = {
            userId: res.data._id,
            token: res.data.token,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          this.router.navigate(['/']);
        } else {
          this.toastr.error(res.message || res.error);
          console.log('Error occured');
        }
      });
    } catch (error: any) {
      throw new Error(`Error occured - ${error.message}`);
    }
  }

  showHidePass(val?: any) {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showPass = true;
    } else {
      this.passwordType = 'password';
      this.showPass = false;
    }
  }
}
