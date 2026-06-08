import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {
  // 数据录入表单
  entryForm: FormGroup;
  
  // 分类列表
  categories: any[] = [];
  
  // 数据列表
  dataList: any[] = [];
  
  // 分页配置
  pagination = {
    page: 1,
    size: 10,
    total: 0
  };

  // 文件上传相关
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;

  // 表单提交状态
  isSubmitting = false;
  submitMessage = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.entryForm = this.fb.group({
      categoryId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      value: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.maxLength(50)],
      time: ['', Validators.required],
      remark: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadDataList();
  }

  // 加载分类列表
  loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  // 加载数据列表
  loadDataList(): void {
    this.dataService.getDataList({
      page: this.pagination.page,
      size: this.pagination.size
    }).subscribe({
      next: (response) => {
        this.dataList = response.data;
        this.pagination.total = response.total;
      }
    });
  }

  // 提交表单
  submitForm(): void {
    if (this.entryForm.invalid) {
      this.submitMessage = '请填写完整的表单信息';
      return;
    }

    this.isSubmitting = true;
    const formData = this.entryForm.value;

    this.dataService.createData(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.submitMessage = '数据录入成功！';
          this.resetForm();
          this.loadDataList();
        } else {
          this.submitMessage = response.message || '录入失败';
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.submitMessage = '网络错误，请稍后重试';
        this.isSubmitting = false;
      }
    });
  }

  // 重置表单
  resetForm(): void {
    this.entryForm.reset();
    this.submitMessage = '';
  }

  // 数据校验
  validateData(): boolean {
    return this.entryForm.valid;
  }

  // 文件选择
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // 校验文件类型
      const validTypes = ['.xlsx', '.xls', '.csv'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(extension)) {
        this.submitMessage = '请选择Excel文件（.xlsx, .xls, .csv）';
        return;
      }

      this.selectedFile = file;
      this.submitMessage = '';
    }
  }

  // 批量导入
  importExcel(): void {
    if (!this.selectedFile) {
      this.submitMessage = '请先选择文件';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    this.dataService.importExcel(this.selectedFile).subscribe({
      next: (response) => {
        if (response.success) {
          this.submitMessage = `成功导入 ${response.count} 条数据`;
          this.selectedFile = null;
          this.loadDataList();
        } else {
          this.submitMessage = response.message || '导入失败';
        }
        this.isUploading = false;
        this.uploadProgress = 100;
      },
      error: (error) => {
        this.submitMessage = '导入失败，请检查文件格式';
        this.isUploading = false;
      }
    });
  }

  // 删除数据
  deleteData(id: number): void {
    if (confirm('确定要删除这条数据吗？')) {
      this.dataService.deleteData(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadDataList();
          }
        }
      });
    }
  }

  // 分页变更
  onPageChange(page: number): void {
    this.pagination.page = page;
    this.loadDataList();
  }

  // 每页条数变更
  onSizeChange(size: number): void {
    this.pagination.size = size;
    this.pagination.page = 1;
    this.loadDataList();
  }
}