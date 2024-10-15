import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgaoGovernamental } from '../../interfaces';
import { OrgaoGovernamentalService } from '../../services/orgao-governamental.service';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-orgao-governamental-show',
  templateUrl: './orgao-governamental-show.component.html',
  styleUrls: ['./orgao-governamental-show.component.css']
})
export class ShowComponent implements OnInit {

  public orgaoGov: OrgaoGovernamental | undefined;


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
