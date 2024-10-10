import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role.interface';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../../shared/interfaces/api-error.interface';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error.service';
import { ExceptionBackEnd } from '../../../shared/interfaces/exception-back-end.interface';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  selector: 'users-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  public roles: Role[] = [];
  public errosApi: any;
  public formValidationService: ValidationService;


  public formCreate: FormGroup = this.formBuilder.group({
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
  ) {
    this.formValidationService = new ValidationService(this.formCreate);
  }

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

  getRoles() {
    this.roleService.getRoles()
      .subscribe(res => this.roles = res);
  }

}
