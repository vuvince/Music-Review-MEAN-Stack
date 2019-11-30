// src/app/pages/song/dmca/dmca.component.ts
// SOURCE: https://auth0.com/blog/real-world-angular-series-part-5/
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { AuthService } from "./../../../auth/auth.service";
import { ApiService } from "./../../../core/api.service";
import { UtilsService } from "./../../../core/utils.service";
import { FilterSortService } from "./../../../core/filter-sort.service";
import { DmcaModel } from "./../../../core/models/dmca.model";
import { Subscription } from "rxjs";
import { expandCollapse } from "./../../../core/expand-collapse.animation";
import { SongModel } from "../../../core/models/song.model";

@Component({
  selector: "app-dmca",
  templateUrl: "./dmca.component.html",
  styleUrls: ["./dmca.component.scss"],
  animations: [expandCollapse]
})
export class DmcaComponent implements OnInit, OnDestroy {
  @Input() songId: string;
  @Input() songTitle: string;
  @Input() song: SongModel;
  dmcasSub: Subscription;
  dmcas: DmcaModel[]; //Array of all dmcas for this specific song
  loading: boolean;
  error: boolean;
  songDmca: DmcaModel;
  showAllDmcas = true;
  showDmcasText = "View All Dmcas";
  showEditForm = false; //FOR EDITING REVIEW
  editBtnText = "Edit My Dmca";

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService
  ) {}

  ngOnInit() {
    this._getDmcas();
    this.toggleEditForm(false);
  }

  //WHEN CICKING SUBMIT
  onSubmitDmca(e) {
    if (e.dmca) {
      console.log("Submitting Dmca");
      this.songDmca = e.dmca;
      this._updateDmcaState(true);
      this.toggleEditForm(false);
    }
  }

  //CAUSES LOADING IF NOT LOGGED IN
  private _updateDmcaState(changed?: boolean) {
    if (this.songDmca && changed) {
      this.dmcas.push(this.songDmca);
    }
  }

  private _getDmcas() {
    this.loading = true;
    // Get Dmcas by song Id
    console.log("_getDmca: songID is");
    console.log(this.songId);
    this.dmcasSub = this.api.getDmcasBySongId$(this.songId).subscribe(
      res => {
        this.dmcas = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  toggleShowDmcas() {
    this.showAllDmcas = !this.showAllDmcas;
    this.showDmcasText = this.showAllDmcas ? "Hide Dmcas" : "Show All Dmcas";
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? "Cancel Edit" : "Edit My Dmca";
  }

  ngOnDestroy() {
    this.dmcasSub.unsubscribe();
  }
}
