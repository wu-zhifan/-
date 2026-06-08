import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {
  // 当前选项卡
  currentTab = 'users';

  // 用户列表
  users: any[] = [];

  // 分类树
  categories: any[] = [];

  // 用户表单
  userForm: FormGroup;

  // 分类表单
  categoryForm: FormGroup;

  // 表单提交状态
  isSubmitting = false;
  submitMessage = '';

  // 当前操作用户ID（模拟管理员）
  operatorId = 1;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      realName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      roleId: ['', Validators.required],
      status: [1, Validators.required]
    });

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      parentId: [0],
      sortOrder: [0]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCategories();
  }

  // 切换选项卡
  switchTab(tab: string): void {
    this.currentTab = tab;
    this.submitMessage = '';
  }

  // 加载用户列表
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      }
    });
  }

  // 加载分类树
  loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = this.buildCategoryTree(data);
      }
    });
  }

  // 构建分类树结构
  buildCategoryTree(data: any[]): any[] {
    const tree: any[] = [];
    const map: { [key: number]: any } = {};

    // 创建映射
    data.forEach(item => {
      map[item.id] = { ...item, children: [] };
    });

    // 构建树
    data.forEach(item => {
      if (item.parentId === 0) {
        tree.push(map[item.id]);
      } else if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      }
    });

    return tree;
  }

  // 添加用户
  addUser(): void {
    if (this.userForm.invalid) {
      this.submitMessage = '请填写完整的用户信息';
      return;
    }

    this.isSubmitting = true;
    this.userService.createUser(this.userForm.value, this.operatorId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.submitMessage = '用户添加成功！';
          this.userForm.reset({ status: 1 });
          this.loadUsers();
        } else {
          this.submitMessage = response.message || '添加失败';
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.submitMessage = '网络错误';
        this.isSubmitting = false;
      }
    });
  }

  // 删除用户
  deleteUser(id: number): void {
    if (confirm('确定要删除该用户吗？')) {
      this.userService.deleteUser(id, this.operatorId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadUsers();
          }
        }
      });
    }
  }

  // 更新用户状态
  updateUserStatus(id: number, status: number): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      this.userService.updateUser(user, this.operatorId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadUsers();
          }
        }
      });
    }
  }

  // 添加分类
  addCategory(): void {
    if (this.categoryForm.invalid) {
      this.submitMessage = '请填写分类名称';
      return;
    }

    this.isSubmitting = true;
    this.dataService.createCategory(this.categoryForm.value).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.submitMessage = '分类添加成功！';
          this.categoryForm.reset({ parentId: 0, sortOrder: 0 });
          this.loadCategories();
        } else {
          this.submitMessage = response.message || '添加失败';
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.submitMessage = '网络错误';
        this.isSubmitting = false;
      }
    });
  }

  // 删除分类
  deleteCategory(id: number): void {
    if (confirm('确定要删除该分类吗？')) {
      this.dataService.deleteCategory(id).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadCategories();
          }
        }
      });
    }
  }

  // 获取角色名称
  getRoleName(roleId: number): string {
    const roles: { [key: number]: string } = {
      1: '管理员',
      2: '编辑员',
      3: '普通用户'
    };
    return roles[roleId] || '未知';
  }
}