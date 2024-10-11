import { Component, OnInit } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { switchMap } from 'rxjs';
import { FormValidationService } from '../../../shared/services/form-validation.service';

@Component({
  selector: 'users-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  public roles: Role[] = [];
  public errosApi: any;
  public user?: User;
  public formValidationService: FormValidationService = new FormValidationService(new FormGroup({}));


  public formEdit: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(250)]],
    role: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
  ) {
    // não é boa pratica
    // this.formValidationService = new ValidationService(this.formEdit);
  }

  ngOnInit() {
    this.getRoles();
    this.formEdit.reset();
    this.setUserEdit();
    this.formValidationService = new FormValidationService(this.formEdit);
  }

  onSave(): void {

    const id: any = this.activatedRoute.snapshot.paramMap.get('id');

    this.verificarFormValidOnSubmit();

    this.userService.update(this.formEdit.value, id)
      .subscribe(
        {
          // é uma função anonina regular, por tanto tem seu proprio contexto
          // por isso devo usar arrapw functions, pois estas não tem seu proprio 'this' do contexto
          next: ({ username }) => {
            this.messageService.success(`Usuário ${username} atualizado com sucesso`);
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
    return this.formValidationService?.isValidField(field);
  }

  getFieldError(field: string): string | null {
    return this.formValidationService.getFieldError(field);
  }

  getRoles() {
    this.roleService.getRoles()
      .subscribe(res => this.roles = res);
  }

  setUserEdit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.userService.findById(id)),
      ).subscribe(
        {
          next: (user: User) => {
            console.log(`Dados do findBYId ${user}`);
            this.user = user;
            this.formEdit.setValue({
              username: user.username,
              email: user.email,
              role: user.role,
            })
          },
          error: (error) => {
            console.log(`ERROR : ${error}`);
          }
        }
      )
  }

}
