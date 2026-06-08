import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = '请输入搜索关键字';
  @Input() filters: any[] = [];
  @Output() searchEvent = new EventEmitter<any>();

  // 搜索关键字
  keyword: string = '';

  // 当前筛选条件
  currentFilter: string = '';

  // 触发搜索
  search(): void {
    this.searchEvent.emit({
      keyword: this.keyword,
      filter: this.currentFilter
    });
  }

  // 输入监听
  onInputChange(): void {
    if (this.keyword.length >= 2 || this.keyword.length === 0) {
      this.search();
    }
  }

  // 筛选条件变更
  onFilterChange(): void {
    this.search();
  }

  // 清空搜索
  clearSearch(): void {
    this.keyword = '';
    this.currentFilter = '';
    this.search();
  }
}