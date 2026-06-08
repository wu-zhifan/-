import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api/data';

  constructor(private http: HttpClient) {}

  // 获取数据列表
  getDataList(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`, { params });
  }

  // 获取单条数据
  getDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 创建数据
  createData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  // 更新数据
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // 删除数据
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // 导入Excel数据
  importExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/import`, formData);
  }

  // 获取统计数据
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  // 获取图表数据
  getChartData(filters: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chart-data`, filters);
  }

  // 获取分类列表
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  // 创建分类
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, category);
  }

  // 删除分类
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`);
  }

  // 导出数据
  exportData(filters: any): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      params: {
        categoryId: filters.categoryId || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || ''
      },
      responseType: 'blob'
    });
  }

  // 获取环比统计数据
  getMonthOverMonthStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/month-over-month`);
  }

  // 获取同比统计数据
  getYearOverYearStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/year-over-year`);
  }

  // 获取年度汇总数据
  getYearlySummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/yearly-summary`);
  }

  // 获取所有分类统计数据
  getCategoryStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/categories`);
  }

  // 获取报表数据（支持日期筛选）
  getReportData(filters: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chart-data`, filters);
  }

  // 更新分类
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, category);
  }
}