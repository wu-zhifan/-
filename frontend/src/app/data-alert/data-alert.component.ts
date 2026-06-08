import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-data-alert',
  templateUrl: './data-alert.component.html',
  styleUrls: ['./data-alert.component.scss']
})
export class DataAlertComponent implements OnInit {
  // 预警规则列表
  alertRules = [
    {
      id: 1,
      name: '月度销售额预警',
      category: '月度销售',
      type: 'threshold',
      condition: '低于',
      threshold: 100000,
      unit: '元',
      status: 'active',
      lastTrigger: '2024-03-15 10:30:00',
      triggerCount: 3
    },
    {
      id: 2,
      name: '数据增长率预警',
      category: '全部',
      type: 'trend',
      condition: '下降超过',
      threshold: 20,
      unit: '%',
      status: 'active',
      lastTrigger: '2024-03-10 14:20:00',
      triggerCount: 1
    },
    {
      id: 3,
      name: '异常数据检测',
      category: '月度营收',
      type: 'anomaly',
      condition: '偏离平均值',
      threshold: 30,
      unit: '%',
      status: 'active',
      lastTrigger: null,
      triggerCount: 0
    },
    {
      id: 4,
      name: '数据完整性预警',
      category: '全部',
      type: 'quality',
      condition: '低于',
      threshold: 95,
      unit: '%',
      status: 'paused',
      lastTrigger: '2024-02-28 09:15:00',
      triggerCount: 2
    }
  ];

  // 预警记录
  alertRecords = [
    {
      id: 1,
      ruleName: '月度销售额预警',
      level: 'warning',
      message: '3月份销售额为95,000元，低于阈值100,000元',
      data: { current: 95000, threshold: 100000, category: '月度销售' },
      createTime: '2024-03-15 10:30:00',
      status: 'unread'
    },
    {
      id: 2,
      ruleName: '数据增长率预警',
      level: 'danger',
      message: '2月份数据增长率下降25%，超过阈值20%',
      data: { current: -25, threshold: -20, category: '全部' },
      createTime: '2024-03-10 14:20:00',
      status: 'read'
    },
    {
      id: 3,
      ruleName: '月度销售额预警',
      level: 'warning',
      message: '2月份销售额为98,000元，低于阈值100,000元',
      data: { current: 98000, threshold: 100000, category: '月度销售' },
      createTime: '2024-02-28 09:15:00',
      status: 'read'
    }
  ];

  // 统计信息
  alertStats = {
    totalRules: 4,
    activeRules: 3,
    todayAlerts: 1,
    unreadAlerts: 1,
    warningCount: 2,
    dangerCount: 1
  };

  // 当前选中的标签页
  activeTab = 'rules';

  // 预测分析数据
  predictionData = {
    nextWeekRisk: 'medium',
    nextWeekRiskScore: 65,
    trend: 'down',
    trendValue: -8.5,
    predictedAlerts: 3,
    highRiskCategories: ['月度销售', '月度营收'],
    suggestions: [
      { id: 1, title: '关注月度销售额', desc: '预测下周销售额可能继续下降，建议提前采取促销措施', priority: 'high' },
      { id: 2, title: '检查数据完整性', desc: '数据完整率近期有所下降，建议检查数据源', priority: 'medium' },
      { id: 3, title: '优化预警规则', desc: '部分规则触发过于频繁，建议调整阈值', priority: 'low' }
    ]
  };

  // 预测图表数据
  predictionChartOption: any;

  // 模态框状态
  showModal = false;
  modalType = '';
  selectedRule: any = null;
  selectedSuggestion: any = null;

  // 新规则表单
  newRule = {
    name: '',
    category: '',
    type: 'threshold',
    condition: '低于',
    threshold: 0,
    unit: '元'
  };

  // 分类列表
  categories: any[] = [];

  constructor(private dataService: DataService, private chartService: ChartService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initPredictionChart();
  }

  loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('加载分类失败:', error);
      }
    });
  }

  // 初始化预测图表
  initPredictionChart(): void {
    this.predictionChartOption = this.chartService.buildLineChart({
      title: '预警趋势预测',
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
      series: [
        {
          name: '实际预警数',
          data: [8, 12, 9, 15, 11, 13],
          color: '#6366f1'
        },
        {
          name: '预测预警数',
          data: [null, null, null, null, null, 16],
          color: '#f59e0b',
          isPredict: true
        }
      ]
    });
  }

  // 切换标签页
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // 查看建议详情
  viewSuggestionDetail(suggestion: any): void {
    this.selectedSuggestion = suggestion;
    this.showModal = true;
    this.modalType = 'suggestion';
  }

  // 查看预警规则
  viewRules(): void {
    this.closeModal();
    this.switchTab('rules');
  }

  // 获取建议详情标题
  getSuggestionDetailTitle(suggestion: any): string {
    return suggestion.title;
  }

  // 获取建议详情内容
  getSuggestionDetailContent(suggestion: any): string {
    const priorityMap: { [key: string]: string } = {
      'high': '高优先级',
      'medium': '中优先级',
      'low': '低优先级'
    };
    const priorityLabel = priorityMap[suggestion.priority] || '未知';
    return `该建议为${priorityLabel}建议。\n\n${suggestion.desc}\n\n建议措施：\n1. 持续监控相关数据指标\n2. 及时采取预防措施\n3. 定期评估预警效果`;
  }

  // 获取优先级样式类
  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  // 获取预警级别样式
  getLevelClass(level: string): string {
    switch (level) {
      case 'danger': return 'level-danger';
      case 'warning': return 'level-warning';
      case 'info': return 'level-info';
      default: return 'level-info';
    }
  }

  // 获取状态样式
  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'paused': return 'status-paused';
      case 'unread': return 'status-unread';
      case 'read': return 'status-read';
      default: return '';
    }
  }

  // 标记为已读
  markAsRead(record: any): void {
    record.status = 'read';
    this.alertStats.unreadAlerts--;
  }

  // 标记全部为已读
  markAllAsRead(): void {
    this.alertRecords.forEach(record => {
      record.status = 'read';
    });
    this.alertStats.unreadAlerts = 0;
  }

  // 切换规则状态
  toggleRuleStatus(rule: any): void {
    rule.status = rule.status === 'active' ? 'paused' : 'active';
  }

  // 打开新增规则模态框
  openAddModal(): void {
    this.modalType = 'add';
    this.showModal = true;
    this.newRule = {
      name: '',
      category: '',
      type: 'threshold',
      condition: '低于',
      threshold: 0,
      unit: '元'
    };
  }

  // 打开编辑规则模态框
  openEditModal(rule: any): void {
    this.modalType = 'edit';
    this.selectedRule = rule;
    this.newRule = { ...rule };
    this.showModal = true;
  }

  // 关闭模态框
  closeModal(): void {
    this.showModal = false;
    this.modalType = '';
    this.selectedRule = null;
  }

  // 保存规则
  saveRule(): void {
    if (this.modalType === 'add') {
      const rule = {
        id: this.alertRules.length + 1,
        ...this.newRule,
        status: 'active',
        lastTrigger: null,
        triggerCount: 0
      };
      this.alertRules.push(rule);
      this.alertStats.totalRules++;
      this.alertStats.activeRules++;
    } else if (this.modalType === 'edit' && this.selectedRule) {
      Object.assign(this.selectedRule, this.newRule);
    }
    this.closeModal();
  }

  // 删除规则
  deleteRule(rule: any): void {
    const index = this.alertRules.indexOf(rule);
    if (index > -1) {
      this.alertRules.splice(index, 1);
      this.alertStats.totalRules--;
      if (rule.status === 'active') {
        this.alertStats.activeRules--;
      }
    }
  }

  // 获取预警类型名称
  getAlertTypeName(type: string): string {
    const typeMap: { [key: string]: string } = {
      threshold: '阈值预警',
      trend: '趋势预警',
      anomaly: '异常检测',
      quality: '质量预警'
    };
    return typeMap[type] || type;
  }
}
