import { Component, OnInit } from '@angular/core';
import { Config } from '../config/config';
import { ServiceHttp } from '../services/service-http.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-form',
  templateUrl: './master-form.component.html',
  styleUrls: ['./master-form.component.css']
})
export class MasterFormComponent implements OnInit {
  formsList: any = null;
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
  deleteForm(formId) {
    if (confirm("Are you sure to delete Form")) {
      this.serviceHttp.getTemplate(Config.deleteForm, 'DEL', formId).subscribe(
        (response) => {
          this.response = response.message;
          setTimeout(() => this.response = '', 2500);
          this.loadTable();
        },
      );
    }
  }
  loadTable() {
    this.serviceHttp.getResponse(Config.getAllForms, 'GET').subscribe((result) => { this.formsList = result; });
  }
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }



}
