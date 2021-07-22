import { Component, OnInit } from '@angular/core';
import { Config } from '../config/config';
import { ServiceHttp } from '../services/service-http.service';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  json_output: any;
  formId = new Date().getTime();
  errorMessage = "";
  loading = true;
  response: "";
  formErrorJson = {
    template_name: '',
    noForm: '',
    form_json: [],
  };


  public form = {
    id: this.formId,
    template_name: '',
    form_json: [],
    created_by: "Neha",
    updated_by: "Codefire"
  };
  console
  constructor(private serviceHttp: ServiceHttp, private router: Router, private validationService: ValidationService) { }
  onSubmit() {
    this.resetErrors();

    this.json_output = JSON.stringify(this.form);
    console.log(this.json_output);
    if (!(this.validationService.formValidation(this.form.form_json, this.form.template_name, this.formErrorJson))) {
      console.log("here");
      this.serviceHttp.getResponse(Config.addForm, 'POST', this.json_output).subscribe(
        (response) => {
          this.response = response;
          console.log("response=", response);
        },
        (error) => {
          console.log("erroe", error);
          this.errorMessage = error.error;
          this.loading = false;
        }
      );
      if (this.loading == true) {
        this.router.navigate(['/master-form', { response: "Form added Successfully" }]);
      }
    }
  }
  ngOnInit() { }
  addForm() {
    this.form.form_json.push({
      id: this.form.form_json.length + 1,
      name: '',
      type: '',
      options: [],
      required: '',
    });
    this.formErrorJson.form_json.push({
      name: '',
      type: '',
      noOption: '',
      options: [],
      radio: '',
    });

  }
  addUserOptions(index) {
    this.form.form_json[index].options.push(null);
  }
  saveOptions(val, index, subIndex) {
    this.form.form_json[index].options[subIndex] = val;
  }
  removeForm(index: number) {
    this.form.form_json.splice(index, 1);
  }
  reset(index) {
    this.form.form_json[index].options = [];
  }
  deleteOption(index, subIndex) {
    this.form.form_json[index].options.splice(subIndex, 1);
  }
  resetErrors() {
    this.formErrorJson.form_json = [];
    this.form.form_json.forEach((item, key) => {
      this.formErrorJson.form_json.push({
        id: item.id,
        name: '',
        type: '',
        noOption: '',
        options: [],
        radio: '',
      });
      item.options.forEach((name, index) => {
        this.formErrorJson.form_json[key].options.push('');
      })
    })
  }
}