import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceHttp } from '../services/service-http.service';
import { Config } from '../config/config';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent implements OnInit {
  template = {
    id: '',
    template_name: '',
    template_description: '',
    template_category: 'dummy',
    template_details: [],
  };
  template_details = [{
    sequence_number: 0,
    type: '',
    heading: '',
    content: '',
    form_template_id: '',
    assign_id: '',
    due_days_from_start: ''
  }];
  addTaskMode = false;
  addHeadingMode = false;
  viewTaskMode = false;
  viewHeadingMode = false;
  emptyMode = false;
  notEmptyMode = true;
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
  ];
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
  loading: any;
  formsList: any = null;
  constructor(private route: ActivatedRoute, private serviceHttp: ServiceHttp, private router: Router, private validationService: ValidationService) { }

  ngOnInit() {
    this.serviceHttp.getResponse(Config.getAllForms, 'GET').subscribe((result) => { this.formsList = result; });
    const routeParams = this.route.snapshot.paramMap;
    const templateIdFromRoute = Number(routeParams.get('templateId'));
    this.serviceHttp.getTemplate(Config.getTemplate, 'GET', templateIdFromRoute)
      .subscribe((result: any) => {
        console.log("respnse=", result)
        this.template.template_name = result.data.template_name;
        this.template.template_description = result.data.template_description;
        this.template.template_details = result.data.template_details;
        this.template.id = result.data.id;
        this.sequence = this.template.template_details.length;
        this.resetErrors();
      });

  }
  loadTable() {
    const routeParams = this.route.snapshot.paramMap;
    const templateIdFromRoute = Number(routeParams.get('templateId'));
    this.serviceHttp.getTemplate(Config.getTemplate, 'GET', templateIdFromRoute)
      .subscribe((result: any) => {
        console.log("respnse=", result)
        this.template.template_name = result.data.template_name;
        this.template.template_description = result.data.template_description;
        this.template.template_details = result.data.template_details;
        this.template.id = result.data.id;
        this.sequence = this.template.template_details.length;
        this.resetErrors();
      });
  }
  openTemplate(id) {
    this.emptyMode = false;
    this.notEmptyMode = false;
    this.addTaskMode = false;
    this.addHeadingMode = false;
    this.templateDetails = this.template.template_details[id];
    if (this.templateDetails.type == 'task') { this.viewTaskMode = true; this.viewHeadingMode = false; }
    else if (this.templateDetails.type == 'heading') { this.viewTaskMode = false; this.viewHeadingMode = true; }
  }
  onSubmit() {
    this.resetErrors();
    console.log(JSON.stringify(this.template));
    // this.validationService.addTemplateValidation(this.template, this.error);
    if (!(this.validationService.addTemplateValidation(this.template, this.error))) {
      this.serviceHttp.update(Config.updateTemplate, 'PUT', this.template.id, JSON.stringify(this.template)).subscribe(
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
    this.template.template_details.push({
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
    this.template.template_details.push({
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
  resetErrors() {
    this.error.template_name = '';
    this.error.template_description = '';
    this.error.noDetails = '';
    this.error.template_details = [];
    this.template.template_details.forEach((item, key) => {
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
  discardChanges() {
    this.emptyMode = false;
    this.emptyMode = false;
    this.notEmptyMode = true;
    this.addTaskMode = false;
    this.addHeadingMode = false;
    this.viewTaskMode = false;
    this.viewHeadingMode = false;
    this.template.template_details = [];
    this.template.template_name = '';
    this.template.template_description = '';
    this.loadTable();
  }
}
