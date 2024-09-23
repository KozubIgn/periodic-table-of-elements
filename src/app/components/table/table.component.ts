import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { PeriodicElement } from '../../interfaces/periodic-element.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../modals/edit-dialog/edit-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ElementsStateService } from '../../state/element-state.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FilterService } from '../../services/filter.service';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [MatTableModule, MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  DELAY_TIME_MS = 2000;
  private filterSubject = new BehaviorSubject<string>('');
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  elements$!: Observable<PeriodicElement[]>;

  constructor(private filterService: FilterService,
    public dialog: MatDialog,
    private elementsStateService: ElementsStateService) { }

  ngOnInit(): void {
    this.elements$ = combineLatest([
      this.elementsStateService.select('elements').pipe(
        map((elements) => elements.map((element) => ({ ...element })))
      ),
      this.filterSubject
    ]).pipe(
      debounceTime(this.DELAY_TIME_MS),
      distinctUntilChanged(),
      map(([elements, query]) => this.filterService.filterElements(elements, query))
    );
  }
  
  onFilter(event: Event): void {
    const query = (event.target as HTMLInputElement)?.value;
    this.filterSubject.next(query);
  }

  openEditDialog(element: PeriodicElement): void {
    console.log(element)
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        debugger;
        console.log(result)
        this.elementsStateService.updateElement(result);
      }
    });
  }
}
