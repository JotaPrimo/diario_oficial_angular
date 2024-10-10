import { Pageable } from "../../shared/interfaces/pageable.interface";
import { Sort } from "../../shared/interfaces/sort.interface";
import { User } from './user.interface';

export interface UserReponsePaginated {
  content:          User[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}


