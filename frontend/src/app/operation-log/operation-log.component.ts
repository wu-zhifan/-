import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-log',
  templateUrl: './operation-log.component.html',
  styleUrls: ['./operation-log.component.scss']
})
export class OperationLogComponent implements OnInit {
  // 日志列表
  logs = [
    {
      id: 1,
      user: 'admin',
      realName: '系统管理员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-15 14:30:25',
      status: 'success'
    },
    {
      id: 2,
      user: 'admin',
      realName: '系统管理员',
      operation: 'VIEW',
      module: '数据看板',
      content: '查看数据看板页面',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-15 14:30:35',
      status: 'success'
    },
    {
      id: 3,
      user: 'editor',
      realName: '数据编辑员',
      operation: 'ADD',
      module: '数据录入',
      content: '新增数据记录：月度销售额 125,000元',
      ip: '192.168.1.101',
      userAgent: 'Firefox 121.0 / Windows 11',
      createTime: '2024-03-15 14:25:10',
      status: 'success'
    },
    {
      id: 4,
      user: 'editor',
      realName: '数据编辑员',
      operation: 'UPDATE',
      module: '数据录入',
      content: '更新数据记录ID: 156，修改金额为 138,000元',
      ip: '192.168.1.101',
      userAgent: 'Firefox 121.0 / Windows 11',
      createTime: '2024-03-15 14:20:45',
      status: 'success'
    },
    {
      id: 5,
      user: 'viewer',
      realName: '数据查看员',
      operation: 'EXPORT',
      module: '数据报表',
      content: '导出分类统计报表',
      ip: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS 14',
      createTime: '2024-03-15 14:15:30',
      status: 'success'
    },
    {
      id: 6,
      user: 'admin',
      realName: '系统管理员',
      operation: 'DELETE',
      module: '用户管理',
      content: '删除用户ID: 15，用户名: test_user',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-15 14:10:15',
      status: 'success'
    },
    {
      id: 7,
      user: 'editor',
      realName: '数据编辑员',
      operation: 'IMPORT',
      module: '数据录入',
      content: '批量导入Excel数据，成功导入 25 条记录',
      ip: '192.168.1.101',
      userAgent: 'Firefox 121.0 / Windows 11',
      createTime: '2024-03-15 14:05:20',
      status: 'success'
    },
    {
      id: 8,
      user: 'viewer',
      realName: '数据查看员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录失败，密码错误',
      ip: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS 14',
      createTime: '2024-03-15 14:00:10',
      status: 'failed'
    },
    {
      id: 9,
      user: 'admin',
      realName: '系统管理员',
      operation: 'CONFIG',
      module: '系统配置',
      content: '修改系统参数：数据保留期限 30天 -> 90天',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-15 13:55:40',
      status: 'success'
    },
    {
      id: 10,
      user: 'editor',
      realName: '数据编辑员',
      operation: 'VIEW',
      module: '数据预警',
      content: '查看预警规则列表',
      ip: '192.168.1.101',
      userAgent: 'Firefox 121.0 / Windows 11',
      createTime: '2024-03-15 13:50:25',
      status: 'success'
    },
    {
      id: 11,
      user: 'admin',
      realName: '系统管理员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-15 13:40:15',
      status: 'success'
    },
    {
      id: 12,
      user: 'viewer',
      realName: '数据查看员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS 14',
      createTime: '2024-03-15 13:35:00',
      status: 'success'
    },
    {
      id: 13,
      user: 'admin',
      realName: '系统管理员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0 / Windows 10',
      createTime: '2024-03-14 09:00:00',
      status: 'success'
    },
    {
      id: 14,
      user: 'editor',
      realName: '数据编辑员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.101',
      userAgent: 'Firefox 121.0 / Windows 11',
      createTime: '2024-03-14 08:45:30',
      status: 'success'
    },
    {
      id: 15,
      user: 'viewer',
      realName: '数据查看员',
      operation: 'LOGIN',
      module: '用户认证',
      content: '用户登录系统',
      ip: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS 14',
      createTime: '2024-03-14 08:30:00',
      status: 'success'
    }
  ];

  // 筛选条件
  filters = {
    user: '',
    operation: '',
    module: '',
    startDate: '',
    endDate: '',
    status: ''
  };

  // 分页
  pagination = {
    page: 1,
    size: 10,
    total: 0
  };

  // 统计数据
  logStats = {
    totalLogs: 0,
    todayLogs: 0,
    loginCount: 0,
    operationCount: 0,
    exportCount: 0,
    failedCount: 0
  };

  // 操作类型选项
  operationTypes = [
    { value: '', label: '全部操作' },
    { value: 'LOGIN', label: '登录' },
    { value: 'LOGOUT', label: '退出' },
    { value: 'VIEW', label: '查看' },
    { value: 'ADD', label: '新增' },
    { value: 'UPDATE', label: '更新' },
    { value: 'DELETE', label: '删除' },
    { value: 'IMPORT', label: '导入' },
    { value: 'EXPORT', label: '导出' },
    { value: 'CONFIG', label: '配置' }
  ];

  // 模块选项
  moduleTypes = [
    { value: '', label: '全部模块' },
    { value: '用户认证', label: '用户认证' },
    { value: '数据看板', label: '数据看板' },
    { value: '数据录入', label: '数据录入' },
    { value: '数据报表', label: '数据报表' },
    { value: '数据预警', label: '数据预警' },
    { value: '用户管理', label: '用户管理' },
    { value: '系统配置', label: '系统配置' }
  ];

  // 状态选项
  statusTypes = [
    { value: '', label: '全部状态' },
    { value: 'success', label: '成功' },
    { value: 'failed', label: '失败' }
  ];

  // 当前显示的日志
  filteredLogs: any[] = [];
  
  // 当前激活的筛选类型
  activeFilter: string = 'all';

  constructor() {}

  ngOnInit(): void {
    this.calculateStats();
    this.applyFilters();
  }

  // 计算统计数据
  calculateStats(): void {
    const today = new Date().toISOString().split('T')[0];
    const todayStr = today.replace(/-/g, '');
    
    this.logStats.totalLogs = this.logs.length;
    this.logStats.todayLogs = this.logs.filter(log => log.createTime.includes('2024-03-15')).length;
    this.logStats.loginCount = this.logs.filter(log => log.operation === 'LOGIN').length;
    this.logStats.operationCount = this.logs.filter(log => log.operation === 'ADD' || log.operation === 'UPDATE' || log.operation === 'DELETE').length;
    this.logStats.exportCount = this.logs.filter(log => log.operation === 'EXPORT').length;
    this.logStats.failedCount = this.logs.filter(log => log.status === 'failed').length;
  }

  // 应用筛选
  applyFilters(): void {
    this.filteredLogs = this.logs.filter(log => {
      const matchUser = !this.filters.user || log.user.includes(this.filters.user) || log.realName.includes(this.filters.user);
      const matchOperation = !this.filters.operation || log.operation === this.filters.operation;
      const matchModule = !this.filters.module || log.module === this.filters.module;
      const matchStatus = !this.filters.status || log.status === this.filters.status;
      
      return matchUser && matchOperation && matchModule && matchStatus;
    });
    
    this.pagination.total = this.filteredLogs.length;
  }

  // 重置筛选
  resetFilters(): void {
    this.filters = {
      user: '',
      operation: '',
      module: '',
      startDate: '',
      endDate: '',
      status: ''
    };
    this.activeFilter = 'all';
    this.applyFilters();
  }

  // 通过统计卡片筛选
  filterByType(type: string): void {
    this.activeFilter = type;
    this.resetFilters();
    
    switch (type) {
      case 'today':
        // 筛选今日日志（模拟）
        this.filteredLogs = this.logs.filter(log => log.createTime.includes('2024-03-15'));
        break;
      case 'login':
        this.filters.operation = 'LOGIN';
        break;
      case 'operation':
        this.filters.operation = 'ADD';
        break;
      case 'export':
        this.filters.operation = 'EXPORT';
        break;
      case 'failed':
        this.filters.status = 'failed';
        break;
      case 'all':
      default:
        this.filteredLogs = [...this.logs];
        break;
    }
    
    if (type !== 'today' && type !== 'all') {
      this.applyFilters();
    }
    
    this.pagination.total = this.filteredLogs.length;
    this.pagination.page = 1;
  }

  // 获取操作类型名称
  getOperationName(operation: string): string {
    const op = this.operationTypes.find(o => o.value === operation);
    return op ? op.label : operation;
  }

  // 获取操作类型样式
  getOperationClass(operation: string): string {
    const classMap: { [key: string]: string } = {
      'LOGIN': 'op-login',
      'LOGOUT': 'op-logout',
      'VIEW': 'op-view',
      'ADD': 'op-add',
      'UPDATE': 'op-update',
      'DELETE': 'op-delete',
      'IMPORT': 'op-import',
      'EXPORT': 'op-export',
      'CONFIG': 'op-config'
    };
    return classMap[operation] || '';
  }

  // 获取状态样式
  getStatusClass(status: string): string {
    return status === 'success' ? 'status-success' : 'status-failed';
  }

  // 分页处理
  getPaginatedLogs(): any[] {
    const start = (this.pagination.page - 1) * this.pagination.size;
    const end = start + this.pagination.size;
    return this.filteredLogs.slice(start, end);
  }

  // 上一页
  prevPage(): void {
    if (this.pagination.page > 1) {
      this.pagination.page--;
    }
  }

  // 下一页
  nextPage(): void {
    const maxPage = Math.ceil(this.pagination.total / this.pagination.size);
    if (this.pagination.page < maxPage) {
      this.pagination.page++;
    }
  }

  // 导出日志
  exportLogs(): void {
    const data = {
      exportTime: new Date().toLocaleString(),
      filters: this.filters,
      logs: this.filteredLogs
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `操作日志_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // 清空日志
  clearLogs(): void {
    if (confirm('确定要清空所有日志记录吗？此操作不可恢复。')) {
      this.logs = [];
      this.applyFilters();
    }
  }

  // 供模板使用的Math对象
  Math = Math;
}
