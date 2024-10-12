import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { OrgaoGovernamentalService } from '../../services/orgao-governamental.service';
import { OrgaoGovernamentalCreateDTO } from '../../interfaces';
import { MessageService } from '../../../shared/services/message.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../shared/services/form-validation.service';


@Component({
  selector: 'app-orgao-governamental-create',
  templateUrl: './orgao-governamental-create.component.html',
  styleUrls: ['./orgao-governamental-create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public formValidationService: FormValidationService;

  private unsubscribe$ = new Subject<void>();
  private tiposOrgaos: string[] = ['Prefeitura Municipal', 'Governo Estadual'];

  public form: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    cnpj: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    tipo: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: OrgaoGovernamentalService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formValidationService = new FormValidationService(this.form);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  // ngOnInit é clico de vida correto para inicialiar componentes
  // que não depende de injeção no construtor
  ngOnInit() {
    this.form.reset();
    this.inicializarForm();
    this.onChangeSelectTipo();
  }

  getTiposOrgaos(): string[] {
    return this.tiposOrgaos;
  }

  inicializarForm() {

  }

  handleSave() {
    this.form.markAllAsTouched();

    const orgaoToSave = this.createEntityFromForm();

    this.service.create(orgaoToSave).subscribe(
      {
        next: (res) => {
          this.messageService.success("Registro salvo com sucesso");
          this.router.navigateByUrl('/orgao-governamental');

        },
        error: (e) => {
          this.messageService.error("Ocorreu um erro");
        }
      }
    );
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

  createEntityFromForm(): OrgaoGovernamentalCreateDTO {
    const orgaoToSave: OrgaoGovernamentalCreateDTO = {
      nome: this.form.value.nome,
      cnpj: this.form.value.cnpj
    }

    return orgaoToSave;
  }

  verificarFormValidOnSubmit() {
    if (this.formValidationService.verificarFormInValidOnSubmit()) {
      this.messageService.info("Preencha todos os dados corretamente");
    }
  }

  isValidField(field: string): boolean | null {
    return this.formValidationService.isValidField(field);
  }

  getFieldError(field: string): string | null {
    return this.formValidationService.getFieldError(field);
  }

}
