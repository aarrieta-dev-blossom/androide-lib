import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pagination',
    standalone: true
})
export class PaginationPipe implements PipeTransform {
    transform(data: any[], args?: { pageIndex: number; pageSize: number; length: number }): any[] {
        if (!args) {
            args = { pageIndex: 0, pageSize: 6, length: data.length };
        }
        return this.paginate(data, args.pageSize, args.pageIndex);
    }

    private paginate(array: any[], pageSize: number, pageNumber: number): any[] {
        return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }
}
