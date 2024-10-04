import { Component, OnInit } from '@angular/core';

/** interfaces */
import { OrgaoGovernamental } from '../../interfaces/orgao-governamental';
import { OrgaoGovernamentalService } from '../../services/orgao-governamental.service';

@Component({
  selector: 'orgao-governamental-list',
  templateUrl: './orgao-governamental-list.component.html',
  styleUrls: ['./orgao-governamental-list.component.css']
})
export class ListComponent implements OnInit {

  public orgaos: OrgaoGovernamental[] = [];

  constructor(
    private orgaoGovernamentalService: OrgaoGovernamentalService
  ) { }

  ngOnInit() {
        this.getOrgaos();
  }

  getOrgaos(): OrgaoGovernamental[] {

    this.orgaoGovernamentalService.getAll();
    return this.orgaos;
  }

}
