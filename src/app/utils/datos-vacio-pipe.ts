import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datosvacios' })
export class DatosVacioPipe implements PipeTransform {
    transform(value: string): string {
        return !value ? "--" : value;
    }
}