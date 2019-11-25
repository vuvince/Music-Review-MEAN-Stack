import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  myMethod() {
    return console.log("Testing HTTP Service");
  }

  //This is from video tutorial, not being used
  getItems() {
    return this.http.get("/products/find_all");
  }

  postItem(item) {
    console.log(item);

    this.http.post("/products/create", item, httpOptions).subscribe(data => {
      console.log(data);
    });
  }
}
