import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {
  // 分类统计数据
  categoryStats: any[] = [];
  
  // 总体统计
  totalStats = {
    totalRecords: 0,
    totalCategories: 0,
    totalValue: 0,
    avgValue: 0
  };
  
  isLoading = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadOverviewData();
  }

  // 加载数据概览
  loadOverviewData(): void {
    this.isLoading = true;
    
    // 使用新的后端API一次性获取所有分类统计
    this.dataService.getCategoryStats().subscribe({
      next: (response) => {
        this.categoryStats = response.categories;
        this.totalStats.totalCategories = response.totalCategories;
        this.totalStats.totalRecords = response.totalRecords;
        this.totalStats.totalValue = response.totalValue;
        this.totalStats.avgValue = response.avgValue;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('加载分类统计失败:', error);
        this.isLoading = false;
      }
    });
  }

  // 格式化数字
  formatNumber(num: number): string {
    return new Intl.NumberFormat('zh-CN', {
      maximumFractionDigits: 2
    }).format(num);
  }

  // 获取分类图标
  getCategoryIcon(index: number): string {
    const icons = ['📊', '📈', '💰', '📉', '👥', '🏷️', '📦', '🌐', '📱', '🎯'];
    return icons[index % icons.length];
  }

  // 获取分类颜色
  getCategoryColor(index: number): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#f59e0b', '#10b981',
      '#3b82f6', '#ef4444', '#ec4899', '#14b8a6',
      '#8b5cf6', '#f97316'
    ];
    return colors[index % colors.length];
  }

  // 计算占比
  getPercentage(value: number): string {
    if (this.totalStats.totalValue === 0) return '0%';
    return ((value / this.totalStats.totalValue) * 100).toFixed(1) + '%';
  }

  // 刷新数据
  refresh(): void {
    this.loadOverviewData();
  }
}
