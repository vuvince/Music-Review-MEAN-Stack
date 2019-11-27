import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./auth/admin.guard";
import { AdminComponent } from "./pages/admin/admin.component";
import { AboutComponent } from "./pages/about/about.component";
import { SongComponent } from "./pages/song/song.component";
import { CreateSongComponent } from "./pages/song/create-song/create-song.component";

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
    // canActivate: [AuthGuard, AdminGuard], //ACCESS REQUIRED (FOR TESTING)
    children: [
      {
        path: "",
        component: AdminComponent
      }
    ]
  },
  {
    path: "song",
    children: [
      {
        path: ":details/:id",
        component: SongComponent
      },
      {
        //WILL NEED TO MOVE PATH ELSEWHERE
        path: "new",
        component: CreateSongComponent,
        canActivate: [AuthGuard] //ACCESS REQUIRED (FOR TESTING)
      }
    ]
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
