import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./pages/callback/callback.component";
import { ApiService } from "./core/api.service";
import { LoadingComponent } from "./core/loading.component";
import { DatePipe } from "@angular/common"; // DONT NEED RN, ADD TO PROVIDERS IF NEEDED
import { UtilsService } from "./core/utils.service";
import { FilterSortService } from "./core/filter-sort.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminComponent } from "./pages/admin/admin.component";
import { SongComponent } from "./pages/song/song.component";
import { SongDetailComponent } from "./pages/song/song-detail/song-detail.component";
import { ReviewComponent } from "./pages/song/review/review.component";
import { AboutComponent } from "./pages/about/about.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReviewFormComponent } from "./pages/song/review/review-form/review-form.component";
import { SubmittingComponent } from "./core/forms/submitting.component";
import { CreateSongComponent } from "./pages/song/create-song/create-song.component";
import { SongFormComponent } from "./pages/song/song-form/song-form.component";
import { UpdateSongComponent } from "./pages/admin/update-song/update-song.component";
import { DeleteSongComponent } from "./pages/admin/update-song/delete-song/delete-song.component";
import { TopChartComponent } from "./pages/top-chart/top-chart.component";
import { DmcaNoticeComponent } from "./pages/dmca-notice/dmca-notice.component";
import { DmcaTakedownComponent } from "./pages/dmca-takedown/dmca-takedown.component";
import { DmcaLogComponent } from "./pages/dmca-log/dmca-log.component";
import { DmcaComponent } from "./pages/song/dmca/dmca.component";
import { DmcaFormComponent } from "./pages/song/dmca/dmca-form/dmca-form.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    AdminComponent,
    SongComponent,
    SongDetailComponent,
    ReviewComponent,
    AboutComponent,
    ReviewFormComponent,
    SubmittingComponent,
    CreateSongComponent,
    SongFormComponent,
    UpdateSongComponent,
    DeleteSongComponent,
    TopChartComponent,
    PolicyComponent,
    DmcaNoticeComponent,
    DmcaTakedownComponent,
    DmcaLogComponent,
    DmcaComponent,
    DmcaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    AuthService,
    ApiService,
    UtilsService,
    FilterSortService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
