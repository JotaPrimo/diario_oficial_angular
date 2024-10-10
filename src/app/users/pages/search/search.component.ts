import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role.interface';
import { EnumStatusUsuario } from '../../enums/status-usuario.enum';

@Component({
  selector: 'users-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public roles: Role[] = [];
  public allStatus: EnumStatusUsuario[] = [];

  @Output() search = new EventEmitter<any>();
  @Output() clearFiltersEvent = new EventEmitter<any>();

  public searchForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    // Inicialização do FormGroup no ngOnInit
    this.searchForm = this.formBuilder.group({
      username: [''],
      email: [''],
      role: [''],
      statusUsuario: ['']
    });

    this.getRoles();
    this.getEnumsStatusUsuario();
  }

  onSearch() {
    this.search.emit(this.searchForm.value);
    console.log("onSearch");
    console.log(this.searchForm.value);
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.clearFiltersEvent.emit();
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe({
        next: (data) => this.roles = data,
        error: (error) => console.log(error)
      });
  }

  getEnumsStatusUsuario(): void {
    this.allStatus = [
      EnumStatusUsuario.ATIVO,
      EnumStatusUsuario.INATIVO,
      EnumStatusUsuario.SUSPENSO,
    ];
  }

}
