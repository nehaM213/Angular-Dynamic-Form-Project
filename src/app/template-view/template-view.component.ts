import { Component, OnInit } from '@angular/core';
import { Config } from '../config/config';
import { ServiceHttp } from '../services/service-http.service';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.css']
})
export class TemplateViewComponent implements OnInit {

  addTaskMode = false;
  addHeadingMode = false;
  viewTaskMode = false;
  viewHeadingMode = false;
  emptyMode = false;
  notEmptyMode = false;
  sequence = 0;
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
  ]
  templates = {
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
  error = {
    template_name: '',
    template_description: '',
    template_category: '',
    noDetails: '',
    template_details: [],
  };
  formsList: any = null;
  loading: any;

  constructor(private serviceHttp: ServiceHttp, private validationService: ValidationService, private router: Router) { }

  ngOnInit() {
    this.serviceHttp.getResponse(Config.getAllForms, 'GET').subscribe((result) => { this.formsList = result; });
    if (this.templates.template_details.length == 0) this.emptyMode = true; else this.notEmptyMode = true;
  }
  onSubmit() {
    console.log(JSON.stringify(this.templates));
    this.resetErrors();
    if (!(this.validationService.addTemplateValidation(this.templates, this.error))) {
      this.serviceHttp.getResponse(Config.createTemplate, 'POST', JSON.stringify(this.templates)).subscribe(
        (response) => {
          console.log(response);

        });
      this.loading = true;
    }
    if (this.loading) {
      this.router.navigate(['/master-template', { response: "Template added Successfully" }]);
    }
  }
  addTask() {
    this.templates.template_details.push({
      sequence_number: this.sequence++,
      type: 'task',
      heading: '',
      content: '',
      form_template_id: '',
      assign_id: '',
      due_days_from_start: ''
    });
    this.error.template_details.push({
      heading: '',
      content: '',
      form_template_id: '',
      assign_id: '',
      due_days_from_start: ''
    })

    this.emptyMode = false;
    this.notEmptyMode = false;
    this.addTaskMode = true;
    this.addHeadingMode = false;
    this.viewTaskMode = false;
    this.viewHeadingMode = false;
  }
  addHeading() {
    this.templates.template_details.push({
      sequence_number: this.sequence++,
      type: 'heading',
      heading: '',
      content: '',
    });
    this.error.template_details.push({
      heading: '',
      content: '',
    })
    this.emptyMode = false;
    this.notEmptyMode = false;
    this.addTaskMode = false;
    this.addHeadingMode = true;
    this.viewTaskMode = false;
    this.viewHeadingMode = false;
  }
  openTemplate(id) {

    this.emptyMode = false;
    this.notEmptyMode = false;
    this.addTaskMode = false;
    this.addHeadingMode = false;
    this.templateDetails = this.templates.template_details[id];
    if (this.templateDetails.type == 'task') { this.viewTaskMode = true; this.viewHeadingMode = false; }
    else if (this.templateDetails.type == 'heading') { this.viewTaskMode = false; this.viewHeadingMode = true; }
  }
  openHeading(sequence_number) {
    this.addHeadingMode = false;
    this.viewHeadingMode = true;
    this.templateDetails = this.templates.template_details[sequence_number];
  }

  discardChanges() {
    this.emptyMode = true;
    this.emptyMode = false;
    this.notEmptyMode = false;
    this.addTaskMode = false;
    this.addHeadingMode = false;
    this.viewTaskMode = false;
    this.viewHeadingMode = false;
    this.templates.template_details = [];
    this.templates.template_name = '';
    this.templates.template_description = '';
  }
  resetErrors() {
    this.error.template_name = '';
    this.error.template_description = '';
    this.error.noDetails = '';
    this.error.template_details = [];
    this.templates.template_details.forEach((item, key) => {
      if (item.type == 'task') {
        this.error.template_details.push({
          heading: '',
          content: '',
          form_template_id: '',
          assign_id: '',
          due_days_from_start: ''
        });
      }
      else {
        this.error.template_details.push({
          heading: '',
          content: '',
        });
      }
    })
  }

}

