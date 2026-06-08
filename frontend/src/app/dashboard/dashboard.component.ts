import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from '../components/chart/chart.component';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('lineChart') lineChart!: ChartComponent;
  @ViewChild('barChart') barChart!: ChartComponent;
  @ViewChild('pieChart') pieChart!: ChartComponent;

  // 统计卡片数据（添加趋势数据）
  statsCards = [
    { title: '总数据量', value: 0, unit: '条', icon: '📊', color: '#6366f1', trend: 0, trendLabel: '环比' },
    { title: '本月新增', value: 0, unit: '条', icon: '📈', color: '#8b5cf6', trend: 0, trendLabel: '同比' },
    { title: '分类数量', value: 0, unit: '个', icon: '📁', color: '#f59e0b', trend: 0, trendLabel: '环比' },
    { title: '活跃用户', value: 0, unit: '人', icon: '👥', color: '#10b981', trend: 0, trendLabel: '同比' }
  ];

  // 环比同比数据
  monthOverMonthData: any[] = [];
  yearOverYearData: any[] = [];
  yearlySummary: any = {};

  // 筛选条件
  filterConditions = {
    startDate: '',
    endDate: '',
    categoryId: '',
    keyword: ''
  };

  // 分类列表
  categories: any[] = [];

  // 图表配置
  lineChartOption: any = {};
  barChartOption: any = {};
  pieChartOption: any = {};
  trendChartOption: any = {}; // 新增趋势图表

  isLoading = false;
  
  // 用于模板中使用Math
  Math = Math;

  constructor(
    private dataService: DataService,
    private chartService: ChartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadDashboardData();
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

  // 加载看板数据
  loadDashboardData(): void {
    this.isLoading = true;

    // 加载统计数据
    this.dataService.getStats().subscribe({
      next: (stats) => {
        this.statsCards[0].value = stats.totalCount;
        this.statsCards[1].value = stats.monthCount;
        this.statsCards[2].value = stats.categoryCount;
        this.statsCards[3].value = stats.activeUsers;
      }
    });

    // 加载环比统计数据
    this.dataService.getMonthOverMonthStats().subscribe({
      next: (data) => {
        this.monthOverMonthData = data;
        if (data.length > 0) {
          // 更新第一个卡片的趋势
          this.statsCards[0].trend = data[0].changeRate || 0;
        }
        // 构建趋势图表
        this.trendChartOption = this.chartService.buildTrendChart(data);
      }
    });

    // 加载同比统计数据
    this.dataService.getYearOverYearStats().subscribe({
      next: (data) => {
        this.yearOverYearData = data;
        if (data.length > 0) {
          // 更新第二个卡片的趋势
          this.statsCards[1].trend = data[0].changeRate || 0;
        }
      }
    });

    // 加载年度汇总数据
    this.dataService.getYearlySummary().subscribe({
      next: (data) => {
        this.yearlySummary = data;
      }
    });

    // 加载图表数据
    this.dataService.getChartData(this.filterConditions).subscribe({
      next: (data) => {
        this.lineChartOption = this.chartService.buildLineChart(data.lineData);
        this.barChartOption = this.chartService.buildBarChart(data.barData);
        this.pieChartOption = this.chartService.buildPieChart(data.pieData);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('加载图表数据失败:', error);
        this.isLoading = false;
      }
    });
  }

  // 筛选条件变更
  onFilterChange(): void {
    this.loadDashboardData();
  }

  // 刷新图表
  refreshCharts(): void {
    this.filterConditions = {
      startDate: '',
      endDate: '',
      categoryId: '',
      keyword: ''
    };
    this.loadDashboardData();
  }

  // 快捷操作：跳转到数据录入
  goToDataEntry(): void {
    this.router.navigate(['/data-entry']);
  }

  // 快捷操作：跳转到数据列表
  goToDataList(): void {
    this.router.navigate(['/data-entry']);
  }

  // 快捷操作：导出数据
  exportData(): void {
    this.dataService.exportData(this.filterConditions).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        alert('数据导出成功！');
      },
      error: (error) => {
        console.error('导出数据失败:', error);
        alert('导出数据失败，请重试');
      }
    });
  }

  // 快捷操作：显示设置
  showSettings(): void {
    this.router.navigate(['/system-config']);
  }
}
