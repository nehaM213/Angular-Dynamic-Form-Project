import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    constructor() { }
    formValidation(data, temp_name, output) {
        console.log("checking Error");
        let hasError = false;
        let errorCount = 0;
        if (temp_name.trim() == '') {
            output.template_name = "*Template Name required";
            errorCount++;
            hasError = true;
        }
        if (data.length == 0) {
            output.noForm = "*Form Required";
            errorCount++;
            hasError = true;
        }

        data.forEach((item, key) => {
            if (item.name == '' || item.name == null) {
                output.form_json[key].name = '*Field Name is missing';
                errorCount++;
            }
            if (item.type == '' || item.type == null) {
                output.form_json[key].type = '*Field Type is missing';
                errorCount++;
            }


            if (item.type == ('select') || item.type == ('radio') || item.type == ('checkbox')) {
                if (item.options.length == 0) {
                    output.form_json[key].noOption = '*Options Missing';
                    errorCount++;
                }
                item.options.forEach((name, index) => {
                    if (name == null || name == '') {
                        output.form_json[key].options[index] = '*Missing Option Name';
                        errorCount++;
                    }
                })
                if (item.type == ('radio') && item.options.length == 1) {
                    output.form_json[key].radio = '*Add minimum 2 options for radio button';
                    errorCount++;
                }
            }
        })
        console.log("error output=", output);
        if (errorCount > 0) return true;
        else return false;
    }
    addTemplateValidation(data, error) {
        let errorCount = 0;
        if (data.template_name == '' || data.template_name == null) {
            error.template_name = ("*Template Name missing");
            errorCount++;
        }
        if (data.template_description == '' || data.template_description == null) {
            error.template_description = ("*Description is missing");
            errorCount++;
        }
        if (data.template_category == '' || data.template_category == null) {
            error.template_description = ("*category is missing");
            errorCount++;
        }
        if (data.template_details.length == 0) {
            error.noDetails = "Add Heading or Task";
            errorCount++;
        }
        data.template_details.forEach((item, key) => {
            if (item.type == 'task') {
                if (item.heading == '' || item.heading == null) {
                    error.template_details[key].heading = "**Task Heading Missing";
                    errorCount++;
                }
                if (item.content == '' || item.content == null) {
                    error.template_details[key].content = "**Task content Missing";
                    errorCount++;
                }
                if (item.form_template_id == '' || item.form_template_id == null) {
                    error.template_details[key].form_template_id = "**Form Missing";
                    errorCount++;
                }
                if (item.assign_id == '' || item.assign_id == null) {
                    error.template_details[key].assign_id = "**Task Assign ID Missing";
                    errorCount++;
                }
                if (item.due_days_from_start == '' || item.due_days_from_start == null) {
                    error.template_details[key].due_days_from_start = "**Task Due date Missing";
                    errorCount++;
                }
            }
            if (item.type == 'heading') {
                if (item.heading == '' || item.heading == null) {
                    error.template_details[key].heading = "**Heading Missing";
                    errorCount++;
                }
                if (item.content == '' || item.content == null) {
                    error.template_details[key].content = "**Heading content Missing";
                    errorCount++;
                }
            }
        })
        if (errorCount) return true; else return false;
    }
}