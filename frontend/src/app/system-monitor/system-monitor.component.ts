import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-system-monitor',
  templateUrl: './system-monitor.component.html',
  styleUrls: ['./system-monitor.component.scss']
})
export class SystemMonitorComponent implements OnInit, OnDestroy {
  // 系统状态
  systemStatus = {
    cpu: {
      usage: 45,
      cores: 8,
      frequency: '3.2 GHz'
    },
    memory: {
      total: 16384,
      used: 8192,
      free: 8192,
      usage: 50
    },
    disk: {
      total: 512000,
      used: 256000,
      free: 256000,
      usage: 50
    },
    network: {
      upload: 2.5,
      download: 8.3,
      connections: 156
    }
  };

  // 在线用户
  onlineUsers = [
    { id: 1, username: 'admin', realName: '系统管理员', loginTime: '2024-03-15 14:30:25', ip: '192.168.1.100', status: 'active' },
    { id: 2, username: 'editor', realName: '数据编辑员', loginTime: '2024-03-15 14:25:10', ip: '192.168.1.101', status: 'active' },
    { id: 3, username: 'viewer', realName: '数据查看员', loginTime: '2024-03-15 14:15:30', ip: '192.168.1.102', status: 'idle' },
    { id: 4, username: 'admin', realName: '系统管理员', loginTime: '2024-03-15 13:50:20', ip: '192.168.1.103', status: 'active' }
  ];

  // 服务状态
  services = [
    { name: 'Web服务', status: 'running', uptime: '15天 3小时', version: '1.0.0', port: 4200 },
    { name: 'API服务', status: 'running', uptime: '15天 3小时', version: '1.0.0', port: 8082 },
    { name: '数据库', status: 'running', uptime: '30天 12小时', version: 'H2 2.1.214', port: 9092 },
    { name: '缓存服务', status: 'running', uptime: '15天 3小时', version: 'Redis 7.0', port: 6379 },
    { name: '消息队列', status: 'stopped', uptime: '-', version: 'RabbitMQ 3.11', port: 5672 }
  ];

  // 系统日志
  systemLogs = [
    { time: '2024-03-15 14:30:25', level: 'info', message: '用户 admin 登录系统' },
    { time: '2024-03-15 14:25:10', level: 'info', message: '数据导入完成，成功导入 25 条记录' },
    { time: '2024-03-15 14:20:05', level: 'warning', message: '内存使用率超过 80%' },
    { time: '2024-03-15 14:15:30', level: 'info', message: '报表导出完成' },
    { time: '2024-03-15 14:10:15', level: 'error', message: '数据库连接超时，已自动重连' },
    { time: '2024-03-15 14:05:20', level: 'info', message: '系统备份完成' },
    { time: '2024-03-15 14:00:10', level: 'warning', message: 'CPU使用率持续高于 70%' }
  ];

  // 性能历史数据
  performanceHistory = {
    cpu: [30, 35, 40, 45, 50, 48, 42, 38, 45, 52, 48, 45],
    memory: [40, 42, 45, 48, 50, 52, 48, 46, 50, 53, 50, 50],
    time: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55']
  };

  // 定时器
  private updateTimer: any;

  constructor() {}

  ngOnInit(): void {
    this.startRealTimeUpdate();
  }

  ngOnDestroy(): void {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }

  // 开始实时更新
  startRealTimeUpdate(): void {
    this.updateTimer = setInterval(() => {
      this.updateSystemStatus();
    }, 5000);
  }

  // 更新系统状态（模拟）
  updateSystemStatus(): void {
    // CPU使用率波动
    this.systemStatus.cpu.usage = Math.max(10, Math.min(90, this.systemStatus.cpu.usage + (Math.random() - 0.5) * 10));
    
    // 内存使用波动
    this.systemStatus.memory.used = Math.max(4096, Math.min(14336, this.systemStatus.memory.used + (Math.random() - 0.5) * 512));
    this.systemStatus.memory.free = this.systemStatus.memory.total - this.systemStatus.memory.used;
    this.systemStatus.memory.usage = Math.round((this.systemStatus.memory.used / this.systemStatus.memory.total) * 100);
    
    // 网络流量波动
    this.systemStatus.network.upload = Math.max(0.5, this.systemStatus.network.upload + (Math.random() - 0.5) * 1);
    this.systemStatus.network.download = Math.max(1, this.systemStatus.network.download + (Math.random() - 0.5) * 2);
    
    // 更新历史数据
    this.performanceHistory.cpu.shift();
    this.performanceHistory.cpu.push(Math.round(this.systemStatus.cpu.usage));
    this.performanceHistory.memory.shift();
    this.performanceHistory.memory.push(this.systemStatus.memory.usage);
  }

  // 获取状态样式
  getStatusClass(status: string): string {
    switch (status) {
      case 'running':
      case 'active':
        return 'status-running';
      case 'stopped':
        return 'status-stopped';
      case 'idle':
        return 'status-idle';
      default:
        return '';
    }
  }

  // 获取日志级别样式
  getLogLevelClass(level: string): string {
    switch (level) {
      case 'error':
        return 'level-error';
      case 'warning':
        return 'level-warning';
      case 'info':
        return 'level-info';
      default:
        return 'level-info';
    }
  }

  // 获取使用率颜色
  getUsageColor(usage: number): string {
    if (usage >= 80) return '#ef4444';
    if (usage >= 60) return '#f59e0b';
    return '#10b981';
  }

  // 手动刷新数据
  refreshData(): void {
    this.updateSystemStatus();
    
    // 随机更新在线用户的状态
    this.onlineUsers.forEach(user => {
      user.status = Math.random() > 0.3 ? 'active' : 'idle';
    });
    
    // 添加新的系统日志
    const logMessages = [
      { level: 'info', message: '系统数据已手动刷新' },
      { level: 'info', message: '用户数据已同步更新' },
      { level: 'warning', message: '检测到后台任务正在运行' },
      { level: 'info', message: '缓存数据已重新加载' }
    ];
    const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
    this.systemLogs.unshift({
      time: new Date().toLocaleString(),
      level: randomLog.level,
      message: randomLog.message
    });
    
    // 保持日志数量不超过10条
    if (this.systemLogs.length > 10) {
      this.systemLogs.pop();
    }
  }

  // 强制下线用户
  kickUser(user: any): void {
    if (confirm(`确定要强制下线用户 ${user.realName} (${user.username}) 吗？`)) {
      const index = this.onlineUsers.indexOf(user);
      if (index > -1) {
        this.onlineUsers.splice(index, 1);
      }
    }
  }

  // 重启服务
  restartService(service: any): void {
    if (confirm(`确定要重启服务 ${service.name} 吗？`)) {
      service.status = 'restarting';
      setTimeout(() => {
        service.status = 'running';
        service.uptime = '0天 0小时';
      }, 2000);
    }
  }

  // 启动服务
  startService(service: any): void {
    if (confirm(`确定要启动服务 ${service.name} 吗？`)) {
      service.status = 'running';
      service.uptime = '0天 0小时';
    }
  }

  // 停止服务
  stopService(service: any): void {
    if (confirm(`确定要停止服务 ${service.name} 吗？`)) {
      service.status = 'stopped';
    }
  }

  // 获取服务状态样式类
  getServiceStatusClass(status: string): string {
    switch (status) {
      case 'running':
        return 'status-running';
      case 'stopped':
        return 'status-stopped';
      case 'error':
        return 'status-error';
      default:
        return 'status-running';
    }
  }

  // 清理日志
  clearLogs(): void {
    if (confirm('确定要清空系统日志吗？')) {
      this.systemLogs = [];
    }
  }

  // 获取性能图表数据
  getPerformanceChartData(): any {
    return {
      title: '系统性能监控',
      xAxis: this.performanceHistory.time,
      series: [
        {
          name: 'CPU使用率',
          data: this.performanceHistory.cpu,
          color: '#6366f1'
        },
        {
          name: '内存使用率',
          data: this.performanceHistory.memory,
          color: '#10b981'
        }
      ]
    };
  }

  // 获取使用率样式
  getUsageStyle(usage: number): any {
    const color = this.getUsageColor(usage);
    return {
      '--usage-color': color
    };
  }

  // 获取stroke-dashoffset值
  getStrokeDashoffset(usage: number): number {
    return 283 - (283 * usage / 100);
  }
}
