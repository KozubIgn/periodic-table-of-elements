import { Injectable } from '@angular/core';
import { PeriodicElement } from '../interfaces/periodic-element.interface'; 

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    filterElements(elements: PeriodicElement[], query: string): PeriodicElement[] {
        if (!query.trim()) {
            return elements;
        }
        const lowerQuery = query.toLowerCase();
        return elements.filter((element) =>
            Object.keys(element).some((key) =>
                element[key as keyof PeriodicElement].toString().toLowerCase().includes(lowerQuery)
            )
        );
    }
}