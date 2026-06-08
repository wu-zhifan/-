import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  logs: any[] = [];
  Math = Math; // Make Math available in template
  
  // 分页
  pagination = { page: 1, size: 10, total: 0 };
  logPagination = { page: 1, size: 10, total: 0 };
  
  // 筛选条件
  filterConditions = {
    keyword: '',
    roleId: null,
    status: null
  };
  
  // 表单
  userForm: FormGroup;
  passwordForm: FormGroup;
  
  // 状态
  isLoading = false;
  isSubmitting = false;
  showModal = false;
  showPasswordModal = false;
  showLogModal = false;
  editMode = false;
  selectedUser: any = null;
  message = '';
  messageType = 'success';
  
  // 当前用户（操作者）
  currentUser: any = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      realName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.pattern(/^1[3-9]\d{9}$/)],
      roleId: ['', Validators.required],
      status: [1]
    });
    
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  // 加载用户列表
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUserList(
      this.filterConditions.keyword,
      this.filterConditions.roleId,
      this.filterConditions.status,
      this.pagination.page,
      this.pagination.size
    ).subscribe({
      next: (data: any) => {
        this.users = data.list;
        this.pagination.total = data.total;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('加载用户失败:', error);
        this.isLoading = false;
      }
    });
  }

  // 加载角色列表
  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
      },
      error: (error: any) => {
        console.error('加载角色失败:', error);
      }
    });
  }

  // 打开新增用户弹窗
  openAddModal(): void {
    this.editMode = false;
    this.selectedUser = null;
    this.userForm.reset({ status: 1 });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.showModal = true;
  }

  // 打开编辑用户弹窗
  openEditModal(user: any): void {
    this.editMode = true;
    this.selectedUser = user;
    this.userForm.patchValue({
      username: user.username,
      realName: user.realName,
      email: user.email,
      phone: user.phone,
      roleId: user.roleId,
      status: user.status
    });
    this.userForm.get('password')?.clearValidators();
    this.showModal = true;
  }

  // 关闭弹窗
  closeModal(): void {
    this.showModal = false;
    this.showPasswordModal = false;
    this.showLogModal = false;
    this.message = '';
  }

  // 提交表单
  submitForm(): void {
    if (this.userForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    const formData = this.userForm.value;
    
    if (this.editMode) {
      // 编辑用户
      this.userService.updateUser({
        id: this.selectedUser.id,
        ...formData
      }, this.currentUser.id).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          if (res.success) {
            this.showMessage('用户更新成功', 'success');
            this.loadUsers();
            setTimeout(() => this.closeModal(), 1500);
          } else {
            this.showMessage(res.message || '更新失败', 'error');
          }
        },
        error: (error: any) => {
          this.isSubmitting = false;
          this.showMessage('操作失败', 'error');
        }
      });
    } else {
      // 新增用户
      this.userService.createUser(formData, this.currentUser.id).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          if (res.success) {
            this.showMessage('用户创建成功', 'success');
            this.loadUsers();
            setTimeout(() => this.closeModal(), 1500);
          } else {
            this.showMessage(res.message || '创建失败', 'error');
          }
        },
        error: (error: any) => {
          this.isSubmitting = false;
          this.showMessage('操作失败', 'error');
        }
      });
    }
  }

  // 删除用户
  deleteUser(user: any): void {
    if (confirm(`确定要删除用户 "${user.username}" 吗？`)) {
      this.userService.deleteUser(user.id, this.currentUser.id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.showMessage('用户删除成功', 'success');
            this.loadUsers();
          } else {
            this.showMessage(res.message || '删除失败', 'error');
          }
        },
        error: (error: any) => {
          this.showMessage('删除失败', 'error');
        }
      });
    }
  }

  // 打开修改密码弹窗
  openPasswordModal(user: any): void {
    this.selectedUser = user;
    this.passwordForm.reset();
    this.showPasswordModal = true;
  }

  // 修改密码
  changePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    this.userService.changePassword(
      this.selectedUser.id,
      this.passwordForm.value.oldPassword,
      this.passwordForm.value.newPassword
    ).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res.success) {
          this.showMessage('密码修改成功', 'success');
          setTimeout(() => this.closeModal(), 1500);
        } else {
          this.showMessage(res.message || '修改失败', 'error');
        }
      },
      error: (error: any) => {
        this.isSubmitting = false;
        this.showMessage('操作失败', 'error');
      }
    });
  }

  // 查看操作日志
  viewLogs(user: any): void {
    this.selectedUser = user;
    this.logPagination.page = 1;
    this.loadLogs();
    this.showLogModal = true;
  }

  // 加载日志
  loadLogs(): void {
    this.userService.getLogs(this.selectedUser.id, this.logPagination.page, this.logPagination.size)
      .subscribe({
        next: (data: any) => {
          this.logs = data.list;
          this.logPagination.total = data.total;
        },
        error: (error: any) => {
          console.error('加载日志失败:', error);
        }
      });
  }

  // 筛选条件变更
  onFilterChange(): void {
    this.pagination.page = 1;
    this.loadUsers();
  }

  // 分页变更
  onPageChange(page: number): void {
    this.pagination.page = page;
    this.loadUsers();
  }

  // 显示消息
  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = type;
  }

  // 获取状态文本
  getStatusText(status: number): string {
    return status === 1 ? '启用' : '禁用';
  }

  // 获取状态样式类
  getStatusClass(status: number): string {
    return status === 1 ? 'status-active' : 'status-disabled';
  }

  // 获取角色颜色
  getRoleColor(roleId: number): string {
    const colors: { [key: number]: string } = {
      1: '#6366f1', // Admin - Purple
      2: '#10b981', // Editor - Green
      3: '#3b82f6'  // Viewer - Blue
    };
    return colors[roleId] || '#64748b';
  }

  // 获取日志图标
  getLogIcon(operation: string): string {
    const icons: { [key: string]: string } = {
      'LOGIN': '🔐',
      'ADD': '➕',
      'UPDATE': '✏️',
      'DELETE': '🗑️',
      'EXPORT': '📤',
      'IMPORT': '📥'
    };
    return icons[operation] || '📋';
  }
}