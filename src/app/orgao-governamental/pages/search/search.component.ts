import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'orgao-governamental-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: ['', []],
      nome: ['', []],
      cnpj: ['', []]
    });
  }

}
