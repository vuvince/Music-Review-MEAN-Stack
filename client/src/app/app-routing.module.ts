import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./auth/admin.guard";
import { AdminComponent } from "./pages/admin/admin.component";
import { AboutComponent } from "./pages/about/about.component";
import { TopChartComponent } from "./pages/top-chart/top-chart.component";
import { SongComponent } from "./pages/song/song.component";
import { CreateSongComponent } from "./pages/song/create-song/create-song.component";
import { UpdateSongComponent } from "./pages/admin/update-song/update-song.component";

const routes: Routes = [
  {
    path: "",
    component: AboutComponent
  },
  {
    path: "all_songs",
    component: HomeComponent
  },
  {
    path: "top_charts",
    component: TopChartComponent
  },
  {
    path: "admin",
    canActivate: [AuthGuard, AdminGuard], //ACCESS REQUIRED (FOR TESTING)
    children: [
      {
        path: "",
        component: AdminComponent
      },
      {
        path: "song/update/:id",
        component: UpdateSongComponent
      }
    ]
  },
  {
    path: "song",
    children: [
      {
        path: "details/:id",
        component: SongComponent
      },
      {
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
