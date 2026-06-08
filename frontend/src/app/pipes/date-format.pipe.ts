import { Pipe, PipeTransform } from '@angular/core';

/**
 * 日期格式化管道
 * 将Date对象转换为指定格式的字符串
 */
@Pipe({
  name: 'dateFormat',
  standalone: false
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    if (!value) {
      return '';
    }

    // 转换为Date对象
    let date: Date;
    if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else if (typeof value === 'number') {
      date = new Date(value);
    } else {
      return '';
    }

    // 校验日期有效性
    if (isNaN(date.getTime())) {
      return '';
    }

    // 格式化日期
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());

    // 替换格式字符串
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  // 补零处理
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
}