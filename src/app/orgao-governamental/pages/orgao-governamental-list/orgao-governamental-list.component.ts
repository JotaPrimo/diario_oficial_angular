import { Component, OnInit } from '@angular/core';

/** interfaces */
import { OrgaoGovernamentalService } from '../../services/orgao-governamental.service';
import { OrgaoGovernamental, OrgaoGovernamentalResponse } from '../../interfaces';

@Component({
  selector: 'orgao-governamental-list',
  templateUrl: './orgao-governamental-list.component.html',
  styleUrls: ['./orgao-governamental-list.component.css'],
})
export class ListComponent implements OnInit {

  public orgaos: OrgaoGovernamental[] = [];

  constructor(private orgaoGovernamentalService: OrgaoGovernamentalService) {}

  ngOnInit() {
    this.getOrgaos();
  }

  getOrgaos(): void {
    this.orgaoGovernamentalService.getAll().subscribe({
      next: (response: OrgaoGovernamentalResponse) => {
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
