import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  /**
   * Define um novo cookie com o nome, valor e opções especificadas.
   * @param nome Nome do cookie.
   * @param valor Valor do cookie.
   * @param expires Dias até o cookie expirar (opcional).
   * @param path Caminho para o qual o cookie é válido (opcional).
   */
  setCookie(nome: string, valor: string, minutosExpiracao: number, path: string = '/') {
    let data = new Date();
    const minutosParaMilissegundos = minutosExpiracao * 60 * 1000;
    data.setTime(data.getTime() + minutosParaMilissegundos);
    const expiresString = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expiresString + ";path=" + path;
  }

  /**
   * Obtém o valor de um cookie com o nome especificado.
   * @param nome Nome do cookie.
   * @returns Valor do cookie, ou vazio se não encontrado.
   */
  getCookie(nome: string): string {
    nome = nome + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nome) == 0) {
        return cookie.substring(nome.length, cookie.length);
      }
    }
    return "";
  }

  /**
   * Exclui um cookie com o nome especificado.
   * @param nome Nome do cookie a ser excluído.
   * @param path Caminho para o qual o cookie é válido (opcional).
   */
  deleteCookie(nome: string, path: string = '/') {
    document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
  }
}
