import { Pipe, PipeTransform } from '@angular/core';

/**
 * 金额数字格式化管道
 * 实现数字千分位分隔、保留指定小数位
 */
@Pipe({
  name: 'numberFormat',
  standalone: false
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string, decimals: number = 2): string {
    if (!value && value !== 0) {
      return '';
    }

    // 转换为数字
    let num: number;
    if (typeof value === 'string') {
      num = parseFloat(value);
    } else {
      num = value;
    }

    // 校验数字有效性
    if (isNaN(num)) {
      return '';
    }

    // 格式化数字
    return this.formatNumber(num, decimals);
  }

  // 格式化数字（千分位 + 小数位）
  private formatNumber(num: number, decimals: number): string {
    // 分割整数和小数部分
    const parts = num.toFixed(decimals).split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? parts[1] : '';

    // 千分位分隔整数部分
    const formattedInteger = this.addThousandsSeparator(integerPart);

    // 组合结果
    if (decimalPart) {
      return `${formattedInteger}.${decimalPart}`;
    }
    return formattedInteger;
  }

  // 添加千分位分隔符
  private addThousandsSeparator(numStr: string): string {
    const result: string[] = [];
    const length = numStr.length;

    for (let i = length - 1; i >= 0; i--) {
      const position = length - i;
      result.unshift(numStr[i]);

      // 每3位添加逗号（不包括首位）
      if (position % 3 === 0 && i !== 0) {
        result.unshift(',');
      }
    }

    return result.join('');
  }
}