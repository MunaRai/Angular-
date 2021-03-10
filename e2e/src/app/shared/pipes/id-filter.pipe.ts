import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFilter'
})
export class IdFilterPipe implements PipeTransform {

  transform(collection: any[], selection: string[], idProp: string, isCollection = true): any {
    return collection.filter(col => isCollection ? !selection.includes(col[idProp]) : selection.includes(col[idProp]) );
  }

}
