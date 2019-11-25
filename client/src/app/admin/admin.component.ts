import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "../http.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(private _http: HttpService) {}

  ngOnInit() {}

  //Adding Items
  addItem(form: NgForm) {
    console.log("Adding Item");
    console.log(form.value);

    var newName = form.value.itemName;
    var newType = form.value.itemType;
    var newLoan = form.value.itemLoan;

    console.log(newName);
    console.log(newType);
    console.log(newLoan);

    if (newName == "" || newType <= 0 || newType == "e") {
      alert("Please enter valid values");
      return;
    }

    if (newType == "") {
      alert("Please select Book/CD");
      return;
    }

    // if (searchItem(newName)) {
    //   alert("Name Already Taken! Please choose another name");
    //   return;
    // }

    let data: any = Object.assign(
      { name: newName },
      { itemType: newType },
      { loanPeriod: newLoan },
      { quantity: 1 }
    );

    this._http.postItem(data);

    alert("Item Created!");

    form.value.itemName = "";
    form.value.itemType = "Book";
    form.value.itemLoan = 0;
  }
}
