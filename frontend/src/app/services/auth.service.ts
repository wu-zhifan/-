import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // 检查本地存储的用户信息
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // 用户登录
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.success && response.user) {
          const userData = {
            ...response.user,
            role: response.user.role,
            permissions: response.user.permissions
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
        }
      })
    );
  }

  // 用户退出
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // 获取当前用户
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // 检查登录状态
  checkAuth(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // 检查权限
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (user.permissions === 'ALL') return true;
    return user.permissions?.includes(permission) || false;
  }

  // 检查角色
  hasRole(roleCode: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.role?.roleCode === roleCode;
  }
}