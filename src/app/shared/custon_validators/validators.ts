import { AbstractControl, ValidatorFn } from '@angular/forms';

export function valorNaListaValidator(lista: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;
    if (lista.includes(valor)) {
      return null;
    }
    return { valorNaoPermitido: { valor } };
  };
}
