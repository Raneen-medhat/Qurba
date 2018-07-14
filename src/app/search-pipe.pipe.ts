import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
    transform(items:Array<any>, searchText: string): any[] {
        if(!items) return []; 
        if(!searchText) return items; // if no searchText return the items Array
        searchText = searchText.toLowerCase();  // convert searchText to lowerCase
        // To filter the items array
        return items.filter( it => {
            // to make the search on the spesific property
            for (const key in it) {
                let name = it['name']['en']
                return name.toLowerCase().includes(searchText);
            }
            });
       }
}
