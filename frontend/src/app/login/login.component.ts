import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 登录方法
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = '请输入正确的用户名和密码';
      return;
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || '登录失败';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = '网络错误，请稍后重试';
        this.isLoading = false;
      }
    });
  }

  // 表单校验
  validateForm(): boolean {
    return this.loginForm.valid;
  }

  // 处理表单输入变化
  onInputChange(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }
}