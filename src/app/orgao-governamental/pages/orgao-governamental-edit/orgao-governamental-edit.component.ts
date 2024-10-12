import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { Subject } from 'rxjs';
import { OrgaoGovernamentalService } from '../../services/orgao-governamental.service';
import { MessageService } from '../../../shared/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgaoGovernamental, OrgaoGovernamentalCreateDTO } from '../../interfaces';

@Component({
  selector: 'app-orgao-governamental-edit',
  templateUrl: './orgao-governamental-edit.component.html',
  styleUrls: ['./orgao-governamental-edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  public formValidationService: FormValidationService;
  public orgao: any = undefined;

  private unsubscribe$ = new Subject<void>();
  private tiposOrgaos: string[] = ['Prefeitura Municipal', 'Governo Estadual'];

  public form: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    cnpj: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: OrgaoGovernamentalService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formValidationService = new FormValidationService(this.form);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUser();
  }

  handleSave(): void {

  }

  getTiposOrgaos() {
    return this.tiposOrgaos;
  }

  isValidField(field: string): boolean | null {
    return this.formValidationService.isValidField(field);
  }

  getFieldError(field: string): string | null {
    return this.formValidationService.getFieldError(field);
  }

  getUser() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.service.findById(id).subscribe({
        next: (res: OrgaoGovernamental) => {
          this.populateForm(res);
        },
      });
      return;
    }

    this.messageService.error("Registro não encontrado");
    this.router.navigateByUrl("/orgao-governamentals/list");
    return;
  }

  populateForm(orgao: OrgaoGovernamental) {
    this.form.get('nome')?.setValue(orgao.nome);
    this.form.get('cnpj')?.setValue(orgao.cnpj);
  }

}
