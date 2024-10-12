import { Pageable, Sort } from "../../shared/interfaces";
import { OrgaoGovernamental } from "./orgao-governamental.interface";

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
