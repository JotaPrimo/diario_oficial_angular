import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgaoGovernamentalService } from '../../../_services/orgao-governamental.service';
import { MessageService } from '../../../shared/services/message.service';
import {OrgaoGovernamental} from "../../../_interfaces/orgao-governamental.interface";

@Component({
  selector: 'app-orgao-governamental-show',
  templateUrl: './orgao-governamental-show.component.html',
  styleUrls: ['./orgao-governamental-show.component.css']
})
export class ShowComponent implements OnInit {

  orgaoGov!: OrgaoGovernamental;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orgService: OrgaoGovernamentalService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getOrgaoGov();
  }

  getOrgaoGov() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id == null) {
      this.messageService.error("Registro não encontrado")
      return;
    }

    this.orgService.findById(id).subscribe({
      next: (orgoao: OrgaoGovernamental) => {
        this.orgaoGov = orgoao;
      },
      error: (err) => {
        this.messageService.error("Ocorreu um erro")
      },
    });
  }
}
