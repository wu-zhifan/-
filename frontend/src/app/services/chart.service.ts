import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  // 深色主题颜色配置
  private darkThemeColors = {
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    background: 'transparent',
    gridLine: 'rgba(71, 85, 105, 0.5)',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  // 渐变色配色方案
  private colorPalette = [
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', // 紫色系
    '#3b82f6', '#06b6d4', '#14b8a6', '#10b981', // 蓝绿系
    '#f59e0b', '#f97316', '#ef4444', '#ec4899'  // 橙红系
  ];

  constructor() {}

  // 构建折线图配置（深色主题）
  buildLineChart(data: any): any {
    const xAxis = data.xAxis || data.map((item: any) => item.name);
    const series = data.series || [{ name: '数据值', data: data.map((item: any) => item.value) }];
    
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: data.title || '',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: this.darkThemeColors.text
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        },
        axisPointer: {
          type: 'cross',
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        }
      },
      legend: {
        data: series.map((s: any) => s.name),
        bottom: '5%',
        textStyle: {
          color: this.darkThemeColors.textSecondary
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
        axisLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 10000) {
              return (value / 10000).toFixed(1) + 'w';
            }
            return value.toString();
          }
        },
        splitLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine,
            type: 'dashed'
          }
        }
      },
      series: series.map((s: any, index: number) => ({
        name: s.name,
        type: 'line',
        smooth: true,
        data: s.data,
        lineStyle: {
          color: s.color || this.colorPalette[index % this.colorPalette.length],
          width: 3
        },
        areaStyle: index === 0 ? {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.hexToRgba(s.color || this.colorPalette[index % this.colorPalette.length], 0.4)
            }, {
              offset: 1, color: this.hexToRgba(s.color || this.colorPalette[index % this.colorPalette.length], 0.05)
            }]
          }
        } : undefined,
        itemStyle: {
          color: s.color || this.colorPalette[index % this.colorPalette.length],
          borderColor: '#fff',
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 8
      })),
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    };
  }

  // 构建柱状图配置（深色主题）
  buildBarChart(data: any): any {
    const categories = data.categories || data.map((item: any) => item.name);
    const series = data.series || [{ name: '数据值', data: data.map((item: any) => item.value) }];
    
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: data.title || '',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: this.darkThemeColors.text
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        },
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(99, 102, 241, 0.1)'
          }
        }
      },
      legend: {
        data: series.map((s: any) => s.name),
        bottom: '5%',
        textStyle: {
          color: this.darkThemeColors.textSecondary
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 10000) {
              return (value / 10000).toFixed(1) + 'w';
            }
            return value.toString();
          }
        },
        splitLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine,
            type: 'dashed'
          }
        }
      },
      series: series.map((s: any, index: number) => ({
        name: s.name,
        type: 'bar',
        data: s.data,
        itemStyle: {
          color: (params: any) => {
            const color = s.color || this.colorPalette[params.dataIndex % this.colorPalette.length];
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: color
              }, {
                offset: 1, color: this.adjustColorBrightness(color, -30)
              }]
            };
          },
          borderRadius: [6, 6, 0, 0]
        },
        barWidth: series.length > 1 ? '30%' : '50%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      })),
      animationDuration: 1500,
      animationEasing: 'elasticOut'
    };
  }

  // 构建饼图配置（深色主题）
  buildPieChart(data: any): any {
    const chartData = data.data || data;
    
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: data.title || '',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: this.darkThemeColors.text
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        },
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        textStyle: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12
        },
        data: chartData.map((item: any) => item.name)
      },
      series: [{
        name: '分类占比',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'rgba(51, 65, 85, 0.8)',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: this.darkThemeColors.text
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData.map((item: any, index: number) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color || this.colorPalette[index % this.colorPalette.length]
          }
        }))
      }],
      animationDuration: 1500,
      animationEasing: 'elasticOut'
    };
  }

  // 构建雷达图配置（深色主题）
  buildRadarChart(data: any): any {
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: data.title || '',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: this.darkThemeColors.text
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        }
      },
      legend: {
        data: data.data.map((item: any) => item.name),
        bottom: '5%',
        textStyle: {
          color: this.darkThemeColors.textSecondary
        }
      },
      radar: {
        indicator: data.indicators.map((item: any, index: number) => ({
          name: item,
          max: 100
        })),
        shape: 'polygon',
        splitNumber: 5,
        axisName: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(99, 102, 241, 0.02)', 'rgba(99, 102, 241, 0.05)']
          }
        },
        axisLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        }
      },
      series: [{
        name: '综合评估',
        type: 'radar',
        data: data.data.map((item: any, index: number) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: this.colorPalette[index % this.colorPalette.length]
          },
          lineStyle: {
            width: 2,
            color: this.colorPalette[index % this.colorPalette.length]
          },
          areaStyle: {
            color: this.hexToRgba(this.colorPalette[index % this.colorPalette.length], 0.2)
          }
        }))
      }],
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    };
  }

  // 构建面积图配置（深色主题）
  buildAreaChart(data: any[]): any {
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: this.darkThemeColors.text
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary
        },
        splitLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        }
      },
      series: [{
        name: '数据值',
        type: 'line',
        stack: '总量',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(99, 102, 241, 0.4)'
            }, {
              offset: 1, color: 'rgba(99, 102, 241, 0.05)'
            }]
          }
        },
        lineStyle: {
          color: this.darkThemeColors.primary
        },
        data: data.map(item => item.value)
      }],
      animationDuration: 1500
    };
  }

  // 构建趋势图表（环比同比）
  buildTrendChart(data: any[]): any {
    return {
      backgroundColor: this.darkThemeColors.background,
      title: {
        text: '环比趋势分析',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: this.darkThemeColors.textSecondary
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: this.darkThemeColors.gridLine,
        textStyle: {
          color: this.darkThemeColors.text
        },
        formatter: (params: any) => {
          const item = params[0];
          const changeRate = data.find(d => d.currentMonth === item.name)?.changeRate || 0;
          const trendIcon = changeRate >= 0 ? '📈' : '📉';
          return `${item.name}<br/>数据值: ${item.value}<br/>变化率: ${changeRate}% ${trendIcon}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.currentMonth),
        axisLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine
          }
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 11
        }
      },
      yAxis: [{
        type: 'value',
        name: '数据值',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 11
        },
        splitLine: {
          lineStyle: {
            color: this.darkThemeColors.gridLine,
            type: 'dashed'
          }
        }
      }, {
        type: 'value',
        name: '变化率(%)',
        axisLine: {
          show: false
        },
        axisLabel: {
          color: this.darkThemeColors.textSecondary,
          fontSize: 11,
          formatter: '{value}%'
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        name: '数据值',
        type: 'bar',
        yAxisIndex: 0,
        data: data.map((item, index) => ({
          value: item.currentValue,
          itemStyle: {
            color: item.changeRate >= 0 ? this.darkThemeColors.success : this.darkThemeColors.danger,
            borderRadius: [4, 4, 0, 0]
          }
        })),
        barWidth: '40%'
      }, {
        name: '变化率',
        type: 'line',
        yAxisIndex: 1,
        data: data.map(item => item.changeRate),
        lineStyle: {
          color: this.darkThemeColors.warning,
          width: 2
        },
        itemStyle: {
          color: this.darkThemeColors.warning
        },
        symbol: 'circle',
        symbolSize: 6
      }],
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    };
  }

  // 调整颜色亮度
  private adjustColorBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  }

  // hex转rgba
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
