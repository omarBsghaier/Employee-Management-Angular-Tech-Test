import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform<T>(items: T[], searchTerm: string): T[] {
    if (!items || !searchTerm) {
      return items;
    }
    const lowerTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerTerm)
      )
    );
  }

}

