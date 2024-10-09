import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { valorNaListaValidator } from '../../../shared/custon_validators';

@Component({
  selector: 'app-orgao-governamental-create',
  templateUrl: './orgao-governamental-create.component.html',
  styleUrls: ['./orgao-governamental-create.component.css']
})
export class CreateComponent implements OnInit {

  private tiposOrgaos: string[] = ['Prefeitura Municipal', 'Governo Estadual'];

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { }

  // ngOnInit é clico de vida correto para inicialiar componentes
  // que não depende de injeção no construtor
  ngOnInit() {
    this.inicializarForm();
    this.onChangeSelectTipo();
  }

  getTiposOrgaos(): string[] {
    return this.tiposOrgaos;
  }

  inicializarForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      cnpj: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  handleSave() {
  }

  onChangeSelectTipo(): void {
    this.form.get('tipo')?.valueChanges.subscribe((value) => {
      this.construindoNome(value);
    });
  }

  /** Método para setar automaticamete o valor */
  construindoNome(novoValor: string): void {
      this.form.get('nome')?.setValue(`${novoValor} `);
  }

}
