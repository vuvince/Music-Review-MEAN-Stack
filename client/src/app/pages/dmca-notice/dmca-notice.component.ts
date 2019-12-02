// src/app/pages/policy/policy.component.ts
// source: https://auth0.com/blog/real-world-angular-series-part-4/
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { Subscription } from "rxjs";
import { PolicyModel } from "./../../core/models/policy.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-dmca-notice",
  templateUrl: "./dmca-notice.component.html",
  styleUrls: ["./dmca-notice.component.scss"]
})
export class DmcaNoticeComponent implements OnInit {
  pageTitle: string;
  id: string;
  loading: boolean;
  error: boolean;
  policyListSub: Subscription;
  policyList: PolicyModel[];
  submitPolicyObj: PolicyModel;
  submitPolicySub: Subscription;
  submitting: boolean;
  policyName: string;
  policyDesc: string;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this._getPolicyList();
    this.policyName = "dmca-notice";
  }

  //Get the full policy list
  private _getPolicyList() {
    this.loading = true;
    // Get future, public policys
    this.policyListSub = this.api.getPolicys$().subscribe(
      res => {
        this.policyList = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  policyChange(event, desc, pName) {
    var policyID = this.getID(event);
    var description = desc;
    this.submitPolicyObj = new PolicyModel(pName, description);

    console.log(policyID);
    this.submitPolicySub = this.api
      .editPolicy$(policyID, this.submitPolicyObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  //Does the route need to change?
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // To Policy page
    this.router.navigate(["/"]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  //TO GET ID
  getID(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    return idAttr;
  }

  ngOnDestroy() {
    if (this.submitPolicySub) {
      this.submitPolicySub.unsubscribe();
    }
    this.policyListSub.unsubscribe();
  }
}
