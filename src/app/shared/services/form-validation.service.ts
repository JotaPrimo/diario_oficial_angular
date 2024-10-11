import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidationService {


  isValidField(field: string, form: FormGroup): boolean | null {
    let hasErrors = form.controls[field].errors;
    let touched = form.controls[field].touched;

    return hasErrors && touched;
  }

  getFieldError(field: string, form: FormGroup): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

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

  verificarFormInValidOnSubmit(form: FormGroup): boolean {
    if (form.invalid) {
      // caso form seja invalido bloquear requisicao
      form.markAllAsTouched();
      return true;
    }
    return false;
  }
}
