import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'users-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<any>();
  @Output() clearFiltersEvent = new EventEmitter<any>();

  public searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Inicialização do FormGroup no ngOnInit
    this.searchForm = this.formBuilder.group({
      username: [''],
      email: [''],
      role: [''],
      status: ['']
    });
  }

  onSearch() {
    this.search.emit(this.searchForm.value);
    console.log("onSearch");
    console.log(this.searchForm.value);
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.clearFiltersEvent.emit();
  }

}
