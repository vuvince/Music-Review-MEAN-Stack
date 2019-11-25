import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  //Object to hold all results returned from API
  products: Object;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.myMethod();
    this._http.getItems().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }
}
