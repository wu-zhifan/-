import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() option: any = {};
  @Input() loading: boolean = false;
  @Input() height: string = '300px';

  private chartInstance: echarts.ECharts | null = null;

  ngOnInit(): void {
    // 初始化图表配置
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      window.removeEventListener('resize', this.handleResize);
    }
  }

  // 初始化图表
  initChart(): void {
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.chartInstance = echarts.init(this.chartContainer.nativeElement);
      
      if (this.option && Object.keys(this.option).length > 0) {
        this.chartInstance.setOption(this.option);
      }

      // 监听窗口大小变化
      window.addEventListener('resize', this.handleResize);
    }
  }

  // 更新图表数据
  updateChart(newOption: any): void {
    if (!this.chartInstance && this.chartContainer && this.chartContainer.nativeElement) {
      this.initChart();
    }
    
    if (this.chartInstance && newOption) {
      this.chartInstance.setOption(newOption, true);
    }
  }

  // 响应窗口大小变化
  handleResize = (): void => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };

  // 显示加载状态
  showLoading(): void {
    if (this.chartInstance) {
      this.chartInstance.showLoading({
        text: '数据加载中...',
        color: '#667eea',
        textColor: '#333',
        maskColor: 'rgba(255, 255, 255, 0.8)'
      });
    }
  }

  // 隐藏加载状态
  hideLoading(): void {
    if (this.chartInstance) {
      this.chartInstance.hideLoading();
    }
  }

  // 监听属性变化
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'] && this.option && Object.keys(this.option).length > 0) {
      this.updateChart(this.option);
    }
    
    if (changes['loading'] && this.loading) {
      this.showLoading();
    } else if (changes['loading'] && !this.loading) {
      this.hideLoading();
    }
  }
}