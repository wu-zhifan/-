import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  // 用户登录
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // 获取用户列表（分页）
  getUserList(keyword: string, roleId: number | null, status: number | null, page: number, size: number): Observable<any> {
    const params: any = { page, size };
    if (keyword) params.keyword = keyword;
    if (roleId) params.roleId = roleId;
    if (status !== null) params.status = status;
    return this.http.get<any>(`${this.apiUrl}/list`, { params });
  }

  // 获取所有用户
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // 获取用户详情
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 创建用户
  createUser(user: any, operatorId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create?operatorId=${operatorId}`, user);
  }

  // 更新用户
  updateUser(user: any, operatorId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update?operatorId=${operatorId}`, user);
  }

  // 删除用户
  deleteUser(id: number, operatorId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete/${id}?operatorId=${operatorId}`, {});
  }

  // 修改密码
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, {
      userId,
      oldPassword,
      newPassword
    });
  }

  // 获取所有角色
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  // 获取操作日志
  getLogs(userId: number | null, page: number, size: number): Observable<any> {
    const params: any = { page, size };
    if (userId) params.userId = userId;
    return this.http.get<any>(`${this.apiUrl}/logs`, { params });
  }

  // 获取活跃用户数
  getActiveUserCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active-count`);
  }
}