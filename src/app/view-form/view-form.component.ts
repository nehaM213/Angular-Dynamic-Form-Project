import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceHttp } from '../services/service-http.service';
import { Config } from '../config/config';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
  form: any = {};
  constructor(private route: ActivatedRoute, private serviceHttp: ServiceHttp) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const formIdFromRoute = Number(routeParams.get('formId'));
    this.serviceHttp.getTemplate(Config.viewForm, 'GET', formIdFromRoute)
      .subscribe((result: any) => {
        this.form = result[0];
        this.form.form_json = JSON.parse(this.form.form_json);
      });
  }

}
