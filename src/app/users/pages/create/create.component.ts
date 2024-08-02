import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role.interface';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../../shared/interfaces/api-error.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'users-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public roles: Role[] = [];
  public errosApi: any;


  public formCreate: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    role: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoles();
    this.formCreate.reset();
  }

  onSave(): void {

    this.verificarFormValidOnSubmit();

    this.userService.salvar(this.formCreate.value)
      .subscribe(
        {
          // é uma função anonina regular, por tanto tem seu proprio contexto
          // por isso devo usar arrapw functions, pois estas não tem seu proprio 'this' do contexto
          next: ({ username }) => {
            this.messageService.success(`Usuário ${username} cadastrado com sucesso`);
            this.router.navigateByUrl('/users/list');
          },
          error: ({ error }) => {

            if (error.hasOwnProperty("errors")) {
              this.errosApi = Object.values(error.errors)
            }

            if (error.hasOwnProperty("message")) {
              this.errosApi = error.message;
            }

            this.messageService.error("Ocorreu um erro");
          },
          complete() {
            console.info("completado");
          },
        }
      );
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
