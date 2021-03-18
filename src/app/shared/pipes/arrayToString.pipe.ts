import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'arrayToString',
})

export class ArrayToStringPipe implements PipeTransform {
  transform(items: string[], separator?: string): string {
    if (!items) {
      return '';
    }
    return items.join(separator || '\n');
  }
}
