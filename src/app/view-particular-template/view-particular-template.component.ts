import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceHttp } from '../services/service-http.service';
import { Config } from '../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-particular-template',
  templateUrl: './view-particular-template.component.html',
  styleUrls: ['./view-particular-template.component.css']
})
export class ViewParticularTemplateComponent implements OnInit {
  template = {
    id: '',
    template_name: '',
    template_description: '',
    template_category: 'dummy',
    template_details: [],
  };
  templateDetails = {
    sequence_number: 0,
    type: '',
    heading: '',
    content: '',
    form_template_id: '',
    assign_id: '',
    due_days_from_start: ''
  }
  assign_ID = [
    {
      id: 1,
      userName: 'neha_codefire'
    },
    {
      id: 2,
      userName: 'rohit_codefire'
    },
    {
      id: 3,
      userName: 'vikas_codefire'
    },
    {
      id: 4,
      userName: 'abhishek_codefire'
    }
  ];
  viewTaskMode = false;
  viewHeadingMode = false;
  emptyMode = false;
  notEmptyMode = true;
  constructor(private route: ActivatedRoute, private serviceHttp: ServiceHttp, private router: Router,) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const templateIdFromRoute = Number(routeParams.get('templateId'));
    this.serviceHttp.getTemplate(Config.getTemplate, 'GET', templateIdFromRoute)
      .subscribe((result: any) => {
        console.log("respnse=", result)
        this.template.template_name = result.data.template_name;
        this.template.template_description = result.data.template_description;
        this.template.template_details = result.data.template_details;
        this.template.id = result.data.id;
      });
  }
  openTemplate(id) {
    this.emptyMode = false;
    this.notEmptyMode = false;
    this.templateDetails = this.template.template_details[id];
    if (this.templateDetails.type == 'task') {
      this.viewTaskMode = true;
      this.viewHeadingMode = false;
      this.templateDetails.assign_id = this.findAssignId(Number(this.templateDetails.assign_id));
    }
    else if (this.templateDetails.type == 'heading') { this.viewTaskMode = false; this.viewHeadingMode = true; }
  }
  findAssignId(id) {
    this.assign_ID.forEach(item => {
      if (item.id == id) {
        return item.userName;
      }
    })
  }

}
