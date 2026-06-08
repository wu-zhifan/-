// 用户实体模型
export interface User {
  id: number;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
  status: number; // 0: 禁用, 1: 启用
  createTime: Date;
}

// 分类实体模型
export interface Category {
  id: number;
  name: string;
  parentId: number;
  sortOrder: number;
  createTime: Date;
  children?: Category[];
}

// 业务数据实体模型
export interface BusinessData {
  id: number;
  categoryId: number;
  categoryName?: string;
  title: string;
  value: number;
  unit: string;
  time: Date;
  remark: string;
  createTime: Date;
}

// 统计数据模型
export interface StatsData {
  totalCount: number;
  monthCount: number;
  categoryCount: number;
  activeUsers: number;
}

// 图表数据模型
export interface ChartData {
  name: string;
  value: number;
}

// 分页响应模型
export interface PageResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}

// API响应模型
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}