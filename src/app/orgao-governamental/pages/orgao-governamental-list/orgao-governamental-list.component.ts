import {Component, OnInit} from '@angular/core';

/** interfaces */
import {OrgaoGovernamentalService} from '../../../_services/orgao-governamental.service';
import {OrgaoGovernamental} from "../../../_interfaces/orgao-governamental.interface";
import {OrgaoGovernamentalPaginated} from "../../dto";

@Component({
  selector: 'orgao-governamental-list',
  templateUrl: './orgao-governamental-list.component.html',
  styleUrls: ['./orgao-governamental-list.component.css'],
})
export class ListComponent implements OnInit {

  orgaos!: OrgaoGovernamental[];

  constructor(private orgaoGovernamentalService: OrgaoGovernamentalService) {}

  ngOnInit() {
    this.getOrgaos();
  }

  getOrgaos(): void {
    this.orgaoGovernamentalService.getAll().subscribe({
      next: (response: OrgaoGovernamentalPaginated) => {
        console.log(response);
        this.orgaos = response.content;
      },
      error: (err) => {
        console.log("asdasdasdasd");
        console.log(err);
      },
    });
  }

  // todo pensar em usar o strategy para os tipos de erros terem ações diferentes
}
