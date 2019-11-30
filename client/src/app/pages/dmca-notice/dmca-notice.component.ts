// src/app/pages/policy/policy.component.ts
// source: https://auth0.com/blog/real-world-angular-series-part-4/
// [TO CHANGE]
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
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
  // policySub: Subscription;
  policy: PolicyModel;
  loading: boolean;
  error: boolean;
  policyListSub: Subscription;
  policyList: PolicyModel[];
  query: "";
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
    // Redirect to song detail
    this.router.navigate(["/policy", res._id]);
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
    this.policyListSub.unsubscribe();
  }
}
