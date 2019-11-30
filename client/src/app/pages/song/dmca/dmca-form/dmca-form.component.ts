// src/app/pages/admin/dmca-form/dmca-form.component.ts
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../../core/api.service";
import { DmcaModel, FormDmcaModel } from "./../../../../core/models/dmca.model";
import { DatePipe } from "@angular/common";
import {
  DATE_REGEX,
  TIME_REGEX,
  stringsToDate
} from "./../../../../core/forms/formUtils.factory";
import { DmcaFormService } from "./dmca-form.service";

@Component({
  selector: "app-dmca-form",
  templateUrl: "./dmca-form.component.html",
  styleUrls: ["./dmca-form.component.scss"],
  providers: [DmcaFormService]
})
export class DmcaFormComponent implements OnInit, OnDestroy {
  @Input() dmca: DmcaModel;
  @Input() songTitle: string;
  @Input() songId: string;
  isEdit: boolean;
  // FormBuilder form
  dmcaForm: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  formDmca: FormDmcaModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitDmcaObj: DmcaModel;
  submitDmcaSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private datePipe: DatePipe,
    public ef: DmcaFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.dmca;
    this.submitBtnText = this.isEdit ? "Update Dmca" : "Create Dmca";
    // Set initial form data
    this.formDmca = this._setFormDmca();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormDmca() {
    if (!this.isEdit) {
      // If creating a new dmca, create new
      // FormDmcaModel with default null data
      return new FormDmcaModel(null, null, null, null, null, null, null);
    } else {
      // If editing existing dmca, create new
      // FormDmcaModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM
      const _shortDate = "M/d/yyyy";
      // return new FormDmcaModel(
      //   this.dmca.title,
      //   this.dmca.location,
      //   this.datePipe.transform(this.dmca.startDatetime, _shortDate),
      //   this.datePipe.transform(this.dmca.startDatetime, "shortTime"),
      //   this.datePipe.transform(this.dmca.endDatetime, _shortDate),
      //   this.datePipe.transform(this.dmca.endDatetime, "shortTime"),
      //   this.dmca.viewPublic,
      //   this.dmca.description
      // );
    }
  }

  private _buildForm() {
    this.dmcaForm = this.fb.group({
      title: [
        // this.formDmca.title,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.titleMax)
        ]
      ],
      location: [
        // this.formDmca.location,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      // viewPublic: [this.formDmca.viewPublic, Validators.required],
      description: [
        // this.formDmca.description,
        Validators.maxLength(this.ef.descMax)
      ],
      datesGroup: this.fb.group({
        startDate: [
          // this.formDmca.startDate,
          [
            Validators.required,
            Validators.maxLength(this.ef.dateMax),
            Validators.pattern(DATE_REGEX)
          ]
        ],
        startTime: [
          // this.formDmca.startTime,
          [
            Validators.required,
            Validators.maxLength(this.ef.timeMax),
            Validators.pattern(TIME_REGEX)
          ]
        ],
        endDate: [
          // this.formDmca.endDate,
          [
            Validators.required,
            Validators.maxLength(this.ef.dateMax),
            Validators.pattern(DATE_REGEX)
          ]
        ],
        endTime: [
          // this.formDmca.endTime,
          [
            Validators.required,
            Validators.maxLength(this.ef.timeMax),
            Validators.pattern(TIME_REGEX)
          ]
        ]
      })
    });
    // Set local property to dmcaForm datesGroup control
    this.datesGroup = this.dmcaForm.get("datesGroup");

    // Subscribe to form value changes
    this.formChangeSub = this.dmcaForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an dmca that is no
    // longer valid (for example, an dmca in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.dmcaForm);
      _markDirty(this.datesGroup);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.dmcaForm) {
      return;
    }
    const _setErrMsgs = (
      control: AbstractControl,
      errorsObj: any,
      field: string
    ) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.ef.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + "<br>";
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== "datesGroup") {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = "";
          _setErrMsgs(this.dmcaForm.get(field), this.formErrors, field);
        } else {
          // Set errors for fields inside datesGroup
          const datesGroupErrors = this.formErrors["datesGroup"];
          for (const dateField in datesGroupErrors) {
            if (datesGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              datesGroupErrors[dateField] = "";
              _setErrMsgs(
                this.datesGroup.get(dateField),
                datesGroupErrors,
                dateField
              );
            }
          }
        }
      }
    }
  }

  private _getSubmitObj() {
    // const startDate = this.datesGroup.get("startDate").value;
    // const startTime = this.datesGroup.get("startTime").value;
    // const endDate = this.datesGroup.get("endDate").value;
    // const endTime = this.datesGroup.get("endTime").value;
    // // Convert form startDate/startTime and endDate/endTime
    // // to JS dates and populate a new DmcaModel for submission
    // return new DmcaModel(
    //   this.dmcaForm.get("title").value,
    //   this.dmcaForm.get("location").value,
    //   // stringsToDate(startDate, startTime),
    //   // stringsToDate(endDate, endTime),
    //   this.dmcaForm.get("viewPublic").value,
    //   this.dmcaForm.get("description").value,
    //   this.dmca ? this.dmca._id : null
    // );
  }

  onSubmit() {
    // this.submitting = true;
    // this.submitDmcaObj = this._getSubmitObj();
    // if (!this.isEdit) {
    //   this.submitDmcaSub = this.api.postDmca$(this.submitDmcaObj).subscribe(
    //     data => this._handleSubmitSuccess(data),
    //     err => this._handleSubmitError(err)
    //   );
    // } else {
    //   this.submitDmcaSub = this.api
    //     .editDmca$(this.dmca._id, this.submitDmcaObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to dmca detail
    this.router.navigate(["/dmca", res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.dmcaForm.reset();
  }

  ngOnDestroy() {
    if (this.submitDmcaSub) {
      this.submitDmcaSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
