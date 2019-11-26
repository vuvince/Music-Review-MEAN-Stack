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
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminComponent } from './pages/admin/admin.component';
import { SongComponent } from './pages/song/song.component';
import { SongDetailComponent } from './pages/song/song-detail/song-detail.component';
import { ReviewComponent } from './pages/song/review/review.component';

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
    ReviewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
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
