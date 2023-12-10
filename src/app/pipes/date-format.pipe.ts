import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) return ''; // Eğer tarih null veya undefined ise boş string döndür

    const date = new Date(value);
    const options = { day: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString('tr-TR', options);
  }

}
