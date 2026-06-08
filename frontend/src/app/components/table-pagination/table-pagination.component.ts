import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent {
  @Input() page: number = 1;
  @Input() size: number = 10;
  @Input() total: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sizeChange = new EventEmitter<number>();

  // 每页条数选项
  sizeOptions = [5, 10, 20, 50, 100];

  // 计算总页数
  get totalPages(): number {
    return Math.ceil(this.total / this.size);
  }

  // 计算显示范围
  get displayRange(): string {
    const start = (this.page - 1) * this.size + 1;
    const end = Math.min(this.page * this.size, this.total);
    return `${start}-${end}`;
  }

  // 切换页码
  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.page) {
      this.pageChange.emit(newPage);
    }
  }

  // 变更每页条数
  changeSize(newSize: number): void {
    this.sizeChange.emit(newSize);
  }

  // 上一页
  prevPage(): void {
    this.changePage(this.page - 1);
  }

  // 下一页
  nextPage(): void {
    this.changePage(this.page + 1);
  }

  // 生成页码数组
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxDisplay = 5;
    let start = Math.max(1, this.page - Math.floor(maxDisplay / 2));
    let end = Math.min(this.totalPages, start + maxDisplay - 1);

    if (end - start + 1 < maxDisplay) {
      start = Math.max(1, end - maxDisplay + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}