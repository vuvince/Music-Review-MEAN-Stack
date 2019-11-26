import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./auth/admin.guard";
import { AdminComponent } from "./pages/admin/admin.component";
import { AboutComponent } from "./pages/about/about.component";
import { SongComponent } from "./pages/song/song.component";

const routes: Routes = [
  {
    path: "",
    component: AboutComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "admin",
    canActivate: [AuthGuard, AdminGuard], //ACCESS REQUIRED
    children: [
      {
        path: "",
        component: AdminComponent
      }
    ]
  },
  {
    path: "song/:id",
    component: SongComponent,
    canActivate: [AuthGuard] //ACCESS REQUIRED
  },
  {
    path: "callback",
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
