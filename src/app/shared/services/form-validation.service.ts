import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidationService {

  private form: FormGroup;

  constructor(form: FormGroup) {
    this.form = form
  }

  isValidField(field: string): boolean | null {
    let hasErrors = this.form.controls[field].errors;
    let touched = this.form.controls[field].touched;

    return hasErrors && touched;
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'email':
          return 'Deve ser um email válido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;

        case 'maxlength':
          return `Mínimo ${errors['maxlength'].requiredLength} caracters.`;
      }
    }

    return null;
  }

  verificarFormInValidOnSubmit(): boolean {
    if (this.form.invalid) {
      // caso form seja invalido bloquear requisicao
      this.form.markAllAsTouched();
      return true;
    }
    return false;
  }
}
