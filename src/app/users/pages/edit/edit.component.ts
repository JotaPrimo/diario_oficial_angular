import { Component, OnInit } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'users-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  public roles: Role[] = [];
  public errosApi: any;


  public formEdit: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(250)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    role: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.formEdit.reset();
  }

  onSave(): void {

    this.verificarFormValidOnSubmit();

    this.userService.salvar(this.formEdit.value)
      .subscribe(
        {
          // é uma função anonina regular, por tanto tem seu proprio contexto
          // por isso devo usar arrapw functions, pois estas não tem seu proprio 'this' do contexto
          next: ({ username }) => {
            this.messageService.success(`Usuário ${username} cadastrado com sucesso`);
            this.router.navigateByUrl('/users/list');
          },
          error: (error: HttpErrorResponse) => {

            this.errosApi = this.errorService.handleError(error);

            this.messageService.error("Ocorreu um erro");
          },
          complete() {
            console.info("completado");
          },
        }
      );
  }

  verificarFormValidOnSubmit() {
    if (this.formEdit.invalid) {
      // caso form seja invalido bloquear requisicao
      this.formEdit.markAllAsTouched();
      this.messageService.info("Preencha todos os dados corretamente");
      return;
    }
  }

  isValidField(field: string): boolean | null {
    let hasErrors = this.formEdit.controls[field].errors;
    let touched = this.formEdit.controls[field].touched;

    return hasErrors && touched;
  }

  getFieldError(field: string): string | null {

    if (!this.formEdit.controls[field]) return null;

    const errors = this.formEdit.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

          case 'email':
          return 'Deve ser um email';

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
