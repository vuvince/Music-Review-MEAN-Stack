import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from './pages/callback/callback.component';
import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent, CallbackComponent, LoadingComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [Title, AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
