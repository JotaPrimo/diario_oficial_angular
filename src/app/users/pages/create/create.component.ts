import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { tap } from 'rxjs';
import { Role } from '../../interfaces/role.interface';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'users-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public roles: Role[] = [];

  public formCreate: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    role: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.formCreate.reset();
  }

  onSave(): void {

    this.verificarFormValidOnSubmit();

    this.userService.salvar(this.formCreate.value)
      .subscribe(
        res => {
          console.log(res);
        }, error => {
          // this.errorMessage = `Erro: ${error.message}\nErros: ${JSON.stringify(error.errors)}`;
          console.error('Erro completo:', error);
          console.log(error)
          // this.isLoading = false;
        }
      );

    // se salvar limpar form e dar alert
  }

  verificarFormValidOnSubmit() {
    if (this.formCreate.invalid) {
      // caso form seja invalido bloquear requisicao
      this.formCreate.markAllAsTouched();
      this.messageService.info("Preencha todos os dados corretamente");
      return;
    }
  }

  isValidField(field: string): boolean | null {
    let hasErrors = this.formCreate.controls[field].errors;
    let touched = this.formCreate.controls[field].touched;

    return hasErrors && touched;
  }

  getFieldError(field: string): string | null {

    if (!this.formCreate.controls[field]) return null;

    const errors = this.formCreate.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }

    return null;
  }

  getRoles() {
    this.roleService.getRoles()
      .subscribe(res => this.roles = res);
  }

}
