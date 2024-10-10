import { Pageable, Sort } from "../../shared/interfaces";

export interface OrgaoGovernamental {
  id: number,
  nome: string,
  cnpj: string,
  created_at: string,
  updated_at: string,
}


export interface OrgaoGovernamentalResponse {
  content:          OrgaoGovernamental[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}



