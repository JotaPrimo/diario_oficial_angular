import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { valorNaListaValidator } from '../../../shared/custon_validators';

@Component({
  selector: 'app-orgao-governamental-create',
  templateUrl: './orgao-governamental-create.component.html',
  styleUrls: ['./orgao-governamental-create.component.css']
})
export class CreateComponent implements OnInit {

  private tiposOrgaos: string[] = ['Municipal', 'Estadual'];

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    cnpj: ['', [Validators.required, ]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  getTiposOrgaos(): string[] {
    return this.tiposOrgaos;
  }

  handleSave() {

  }


}
