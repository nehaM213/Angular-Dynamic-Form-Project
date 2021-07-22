import { Component, OnInit } from '@angular/core';
import { Config } from '../config/config';
import { ServiceHttp } from '../services/service-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.css']
})
export class MasterTemplateComponent implements OnInit {
  templateList: any = null;
  response: '';
  message = '';
  routeParams = null;
  pageOfItems: Array<any> = [];
  constructor(private serviceHttp: ServiceHttp, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.routeParams = this.route.snapshot.paramMap) {
      this.response = this.routeParams.get('response');
      setTimeout(() => this.response = '', 2500);
    }
    this.loadTable();
  }
  deleteTemplate(templateId) {
    if (confirm("Are you sure to delete this Template")) {
      this.serviceHttp.getTemplate(Config.deleteTemplate, 'DEL', templateId).subscribe(
        (response) => {
          this.response = response.message;
          setTimeout(() => this.response = '', 2500);
          this.loadTable();
        },
      );
    }
  }
  loadTable() {
    this.serviceHttp.getResponse(Config.allTemplates, 'GET').subscribe((result) => { this.templateList = result.data; });
  }

}
