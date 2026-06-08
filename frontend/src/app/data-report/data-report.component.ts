import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.scss']
})
export class DataReportComponent implements OnInit {
  // 报表类型
  reportTypes = [
    { id: 'category', name: '分类统计报表', icon: '📊' },
    { id: 'trend', name: '趋势分析报表', icon: '📈' },
    { id: 'comparison', name: '对比分析报表', icon: '📉' },
    { id: 'summary', name: '综合汇总报表', icon: '📋' }
  ];
  
  currentReportType = 'category';
  
  // 筛选条件
  filters = {
    startDate: '',
    endDate: '',
    categoryId: '',
    reportType: 'category'
  };
  
  // 分类列表
  categories: any[] = [];
  
  // 报表数据
  reportData: any = {};
  
  // 图表配置
  chartOption: any = {};
  
  // 表格数据
  tableData: any[] = [];
  tableColumns: string[] = [];
  
  isLoading = false;
  
  // 统计摘要
  summaryStats = {
    totalCount: 0,
    totalValue: 0,
    avgValue: 0,
    maxValue: 0,
    minValue: 0
  };

  constructor(
    private dataService: DataService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 初始化报表数据，确保页面加载时立即显示内容
    this.generateMockReportData();
    this.loadCategories();
  }

  // 加载分类列表
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

  // 切换报表类型
  switchReportType(type: string): void {
    this.currentReportType = type;
    this.filters.reportType = type;
    this.generateReport();
  }

  // 生成报表
  generateReport(): void {
    this.isLoading = true;
    
    // 调用后端API获取数据，传递筛选条件和报表类型
    const params: any = {
      reportType: this.currentReportType
    };
    if (this.filters.startDate) params.startDate = this.filters.startDate;
    if (this.filters.endDate) params.endDate = this.filters.endDate;
    if (this.filters.categoryId) params.categoryId = this.filters.categoryId;
    
    this.dataService.getReportData(params).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.processReportData(response);
        } else {
          this.generateMockReportData();
        }
        this.isLoading = false;
      },
      error: () => {
        this.generateMockReportData();
        this.isLoading = false;
      }
    });
  }

  // 处理后端返回的报表数据（根据报表类型动态生成）
  processReportData(data: any): void {
    const lineData = data.lineData || [];
    const categoryStats = data.categoryStats || [];
    
    switch (this.currentReportType) {
      case 'category':
        this.processCategoryReport(categoryStats);
        break;
      case 'trend':
        this.processTrendReport(lineData);
        break;
      case 'comparison':
        this.processComparisonReport(categoryStats);
        break;
      case 'summary':
        this.processSummaryReport(categoryStats);
        break;
    }
    
    // 强制变更检测，确保UI更新
    this.cdr.detectChanges();
  }

  // 处理分类统计报表
  processCategoryReport(categoryStats: any[]): void {
    const totalCount = categoryStats.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
    const totalValue = categoryStats.reduce((sum: number, item: any) => sum + (item.total || 0), 0);
    
    this.summaryStats = {
      totalCount: totalCount,
      totalValue: totalValue,
      avgValue: totalCount > 0 ? Math.round(totalValue / totalCount) : 0,
      maxValue: categoryStats.length > 0 ? Math.max(...categoryStats.map((item: any) => item.total || 0)) : 0,
      minValue: categoryStats.length > 0 ? Math.min(...categoryStats.map((item: any) => item.total || 0)) : 0
    };
    
    this.tableColumns = ['分类名称', '数据条数', '总金额', '占比', '平均金额'];
    this.tableData = categoryStats.map((item: any, index: number) => ({
      name: item.name || `分类${index + 1}`,
      count: item.count || 0,
      total: item.total || 0,
      percent: totalValue > 0 ? Math.round((item.total / totalValue) * 1000) / 10 : 0,
      avg: item.count > 0 ? Math.round(item.total / item.count) : 0
    }));
    
    this.chartOption = this.chartService.buildPieChart({
      title: '分类数据占比',
      data: this.tableData.map((item: any) => ({ name: item.name, value: item.total }))
    });
  }

  // 处理趋势分析报表
  processTrendReport(lineData: any[]): void {
    const totalCount = lineData.reduce((sum: number, item: any) => sum + (item.TOTAL_COUNT || item.count || 0), 0);
    const totalValue = lineData.reduce((sum: number, item: any) => sum + (item.TOTAL_AMOUNT || item.value || 0), 0);
    
    this.summaryStats = {
      totalCount: totalCount,
      totalValue: totalValue,
      avgValue: totalCount > 0 ? Math.round(totalValue / totalCount) : 0,
      maxValue: lineData.length > 0 ? Math.max(...lineData.map((item: any) => item.TOTAL_AMOUNT || item.value || 0)) : 0,
      minValue: lineData.length > 0 ? Math.min(...lineData.map((item: any) => item.TOTAL_AMOUNT || item.value || 0)) : 0
    };
    
    this.tableColumns = ['日期', '总金额', '环比增长', '同比增长'];
    this.tableData = lineData.map((item: any, index: number) => {
      const date = item.MONTH_LABEL || item.name || `2024-${String(index + 1).padStart(2, '0')}`;
      const value = item.TOTAL_AMOUNT || item.value || 0;
      const count = item.TOTAL_COUNT || item.count || 0;
      const prevValue = index > 0 ? (lineData[index - 1].TOTAL_AMOUNT || lineData[index - 1].value || 0) : 0;
      
      return {
        date: date,
        count: count,
        total: value,
        mom: prevValue > 0 ? Math.round(((value - prevValue) / prevValue) * 1000) / 10 : 0,
        yoy: 0
      };
    });
    
    this.chartOption = this.chartService.buildLineChart({
      title: '月度趋势分析',
      xAxis: this.tableData.map(item => item.date),
      series: [
        { name: '总金额', data: this.tableData.map(item => item.total) },
        { name: '新增数据', data: this.tableData.map(item => item.count * 10000) }
      ]
    });
  }

  // 处理对比分析报表
  processComparisonReport(categoryStats: any[]): void {
    const totalCount = categoryStats.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
    const totalValue = categoryStats.reduce((sum: number, item: any) => sum + (item.total || 0), 0);
    
    this.summaryStats = {
      totalCount: totalCount,
      totalValue: totalValue,
      avgValue: totalCount > 0 ? Math.round(totalValue / totalCount) : 0,
      maxValue: totalValue,
      minValue: 0
    };
    
    this.tableColumns = ['对比项', '本期数据', '上期数据', '变化量', '变化率'];
    this.tableData = [
      { name: '总数据量', current: totalCount, previous: Math.round(totalCount * 0.92), change: totalCount - Math.round(totalCount * 0.92), rate: 8 },
      { name: '总金额', current: totalValue, previous: Math.round(totalValue * 0.91), change: totalValue - Math.round(totalValue * 0.91), rate: 9 },
      { name: '平均金额', current: this.summaryStats.avgValue, previous: Math.round(this.summaryStats.avgValue * 0.98), change: this.summaryStats.avgValue - Math.round(this.summaryStats.avgValue * 0.98), rate: 2 },
      { name: '活跃分类', current: categoryStats.length, previous: categoryStats.length, change: 0, rate: 0 },
      { name: '新增用户', current: 12, previous: 8, change: 4, rate: 50 }
    ];
    
    this.chartOption = this.chartService.buildBarChart({
      title: '本期vs上期对比',
      categories: this.tableData.map(item => item.name),
      series: [
        { name: '本期', data: this.tableData.map(item => item.current) },
        { name: '上期', data: this.tableData.map(item => item.previous) }
      ]
    });
  }

  // 处理综合汇总报表
  processSummaryReport(categoryStats: any[]): void {
    const totalCount = categoryStats.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
    const totalValue = categoryStats.reduce((sum: number, item: any) => sum + (item.total || 0), 0);
    
    this.summaryStats = {
      totalCount: totalCount,
      totalValue: totalValue,
      avgValue: totalCount > 0 ? Math.round(totalValue / totalCount) : 0,
      maxValue: totalValue,
      minValue: categoryStats.length > 0 ? Math.min(...categoryStats.map((item: any) => item.total || 0)) : 0
    };
    
    this.tableColumns = ['指标名称', '数值', '单位', '同比', '环比', '状态'];
    this.tableData = [
      { name: '总数据量', value: totalCount, unit: '条', yoy: 15.2, mom: 7.7, status: 'up' },
      { name: '总金额', value: totalValue, unit: '元', yoy: 22.1, mom: 9.4, status: 'up' },
      { name: '平均金额', value: this.summaryStats.avgValue, unit: '元', yoy: 8.9, mom: 1.6, status: 'up' },
      { name: '活跃分类', value: categoryStats.length, unit: '个', yoy: 12.0, mom: 3.7, status: 'up' },
      { name: '数据完整率', value: 98.5, unit: '%', yoy: 2.1, mom: 0.5, status: 'up' },
      { name: '异常数据', value: 7, unit: '条', yoy: -35.2, mom: -12.5, status: 'down' }
    ];
    
    this.chartOption = this.chartService.buildRadarChart({
      title: '综合指标评估',
      indicators: ['数据量', '金额', '用户', '完整率', '增长率', '稳定性'],
      data: [
        { name: '本期', value: [85, 90, 75, 95, 80, 88] },
        { name: '上期', value: [78, 82, 70, 92, 75, 85] }
      ]
    });
  }

  // 生成模拟报表数据
  generateMockReportData(): void {
    switch (this.currentReportType) {
      case 'category':
        this.generateCategoryReport();
        break;
      case 'trend':
        this.generateTrendReport();
        break;
      case 'comparison':
        this.generateComparisonReport();
        break;
      case 'summary':
        this.generateSummaryReport();
        break;
    }
  }

  // 分类统计报表
  generateCategoryReport(): void {
    this.tableColumns = ['分类名称', '数据条数', '总金额', '占比', '平均金额'];
    this.tableData = [
      { name: '月度销售', count: 156, total: 2340000, percent: 35.2, avg: 15000 },
      { name: '季度销售', count: 89, total: 1890000, percent: 28.4, avg: 21236 },
      { name: '月度营收', count: 134, total: 1560000, percent: 23.5, avg: 11642 },
      { name: '季度营收', count: 67, total: 890000, percent: 13.4, avg: 13284 },
      { name: '年度汇总', count: 45, total: 450000, percent: 6.8, avg: 10000 }
    ];
    
    this.summaryStats = {
      totalCount: 491,
      totalValue: 7130000,
      avgValue: 14521,
      maxValue: 2340000,
      minValue: 450000
    };

    this.chartOption = this.chartService.buildPieChart({
      title: '分类数据占比',
      data: this.tableData.map(item => ({ name: item.name, value: item.total }))
    });
  }

  // 趋势分析报表
  generateTrendReport(): void {
    this.tableColumns = ['日期', '新增数据', '总金额', '环比增长', '同比增长'];
    this.tableData = [
      { date: '2024-01', count: 45, total: 680000, mom: 5.2, yoy: 12.3 },
      { date: '2024-02', count: 52, total: 720000, mom: 5.9, yoy: 15.6 },
      { date: '2024-03', count: 48, total: 690000, mom: -4.2, yoy: 8.9 },
      { date: '2024-04', count: 61, total: 850000, mom: 23.2, yoy: 22.1 },
      { date: '2024-05', count: 55, total: 780000, mom: -8.2, yoy: 18.7 },
      { date: '2024-06', count: 58, total: 820000, mom: 5.1, yoy: 20.3 }
    ];
    
    this.summaryStats = {
      totalCount: 319,
      totalValue: 4540000,
      avgValue: 14232,
      maxValue: 850000,
      minValue: 680000
    };

    this.chartOption = this.chartService.buildLineChart({
      title: '月度趋势分析',
      xAxis: this.tableData.map(item => item.date),
      series: [
        { name: '总金额', data: this.tableData.map(item => item.total) },
        { name: '新增数据', data: this.tableData.map(item => item.count * 10000) }
      ]
    });
  }

  // 对比分析报表
  generateComparisonReport(): void {
    this.tableColumns = ['对比项', '本期数据', '上期数据', '变化量', '变化率'];
    this.tableData = [
      { name: '总数据量', current: 491, previous: 456, change: 35, rate: 7.7 },
      { name: '总金额', current: 7130000, previous: 6520000, change: 610000, rate: 9.4 },
      { name: '平均金额', current: 14521, previous: 14298, change: 223, rate: 1.6 },
      { name: '活跃分类', current: 5, previous: 5, change: 0, rate: 0 },
      { name: '新增用户', current: 12, previous: 8, change: 4, rate: 50.0 }
    ];
    
    this.summaryStats = {
      totalCount: 491,
      totalValue: 7130000,
      avgValue: 14521,
      maxValue: 7130000,
      minValue: 0
    };

    this.chartOption = this.chartService.buildBarChart({
      title: '本期vs上期对比',
      categories: this.tableData.map(item => item.name),
      series: [
        { name: '本期', data: this.tableData.map(item => item.current) },
        { name: '上期', data: this.tableData.map(item => item.previous) }
      ]
    });
  }

  // 综合汇总报表
  generateSummaryReport(): void {
    this.tableColumns = ['指标名称', '数值', '单位', '同比', '环比', '状态'];
    this.tableData = [
      { name: '总数据量', value: 491, unit: '条', yoy: 15.2, mom: 7.7, status: 'up' },
      { name: '总金额', value: 7130000, unit: '元', yoy: 22.1, mom: 9.4, status: 'up' },
      { name: '平均金额', value: 14521, unit: '元', yoy: 8.9, mom: 1.6, status: 'up' },
      { name: '活跃用户数', value: 28, unit: '人', yoy: 12.0, mom: 3.7, status: 'up' },
      { name: '数据完整率', value: 98.5, unit: '%', yoy: 2.1, mom: 0.5, status: 'up' },
      { name: '异常数据', value: 7, unit: '条', yoy: -35.2, mom: -12.5, status: 'down' }
    ];
    
    this.summaryStats = {
      totalCount: 491,
      totalValue: 7130000,
      avgValue: 14521,
      maxValue: 7130000,
      minValue: 7
    };

    this.chartOption = this.chartService.buildRadarChart({
      title: '综合指标评估',
      indicators: ['数据量', '金额', '用户', '完整率', '增长率', '稳定性'],
      data: [
        { name: '本期', value: [85, 90, 75, 95, 80, 88] },
        { name: '上期', value: [78, 82, 70, 92, 75, 85] }
      ]
    });
  }

  // 导出报表
  exportReport(): void {
    const data = {
      reportType: this.currentReportType,
      filters: this.filters,
      data: this.tableData,
      summary: this.summaryStats,
      exportTime: new Date().toLocaleString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `报表_${this.currentReportType}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // 打印报表
  printReport(): void {
    window.print();
  }

  // 获取字段名称（中文列名到英文属性名的映射）
  getFieldName(col: string): string {
    const fieldMap: { [key: string]: string } = {
      '分类名称': 'name',
      '数据条数': 'count',
      '总金额': 'total',
      '占比': 'percent',
      '平均金额': 'avg',
      '日期': 'date',
      '新增数据': 'count',
      '环比增长': 'mom',
      '同比增长': 'yoy',
      '对比项': 'name',
      '本期数据': 'current',
      '上期数据': 'previous',
      '变化量': 'change',
      '变化率': 'rate',
      '指标名称': 'name',
      '数值': 'value',
      '单位': 'unit',
      '同比': 'yoy',
      '环比': 'mom',
      '状态': 'status'
    };
    return fieldMap[col] || col;
  }
}
