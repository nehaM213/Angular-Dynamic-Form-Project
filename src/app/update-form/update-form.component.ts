import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceHttp } from '../services/service-http.service';
import { Config } from '../config/config';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  form: any = {
  };
  loading = true;
  response: "";
  errorMessage = "";
  formErrorJson = {
    template_name: '',
    noForm: '',
    form_json: [],
  };
  form_json = []
  constructor(private route: ActivatedRoute, private serviceHttp: ServiceHttp, private router: Router, private validationService: ValidationService) { }
  onUpdate() {
    // this.formErrorJson = {
    //   template_name: '',
    //   noForm: '',
    //   form_json: [],
    // };
    this.resetErrors();
    console.log("reseting errors", this.formErrorJson);
    if (!(this.validationService.formValidation(this.form.form_json, this.form.template_name, this.formErrorJson))) {
      this.serviceHttp.update(Config.updateForm, 'PUT', this.form.id, JSON.stringify(this.form)).subscribe(
        (response) => {
          this.response = response;
          console.log(response);
        },
        (error) => {
          this.errorMessage = error.error;
          this.loading = false;
          console.log(this.errorMessage);
        }
      );
      if (this.loading == true) {
        this.router.navigate(['/master-form', { response: "Form updated Successfully" }]);
      }
    }
    console.log(this.formErrorJson);
  }
  ngOnInit() {
    // this.formErrorJson.form_json.push({
    //   name: '',
    //   type: '',
    //   noOption: '',
    //   options: [],
    //   radio: '',
    // });

    const routeParams = this.route.snapshot.paramMap;
    const formIdFromRoute = Number(routeParams.get('formId'));
    this.serviceHttp.getTemplate(Config.viewForm, 'GET', formIdFromRoute)
      .subscribe((result: any) => {
        console.log("respnse=", result[0])
        this.form = result[0];
        this.form.form_json = JSON.parse(this.form.form_json);
        // this.form_json = this.form.form_json
        // console.log("Json form", this.form_json);
        this.resetErrors();
        console.log("errors=", this.formErrorJson);

      });
    // this.formErrorJson.form_json.push({
    //   name: '',
    //   type: '',
    //   noOption: '',
    //   options: [],
    //   radio: '',
    // });

  }
  addForm() {
    this.form.form_json.push({
      id: this.form.form_json.length + 1,
      name: '',
      type: '',
      options: [],
      required: '',
    });
    this.resetErrors();
  }
  addUserOptions(index) {
    this.form.form_json[index].options.push(null);
  }
  saveOptions(val, index, subIndex) {
    this.form.form_json[index].options[subIndex] = val;
  }
  removeForm(index: number) {
    this.form.form_json.splice(index, 1);
    this.formErrorJson.form_json.splice(index, 1);
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
