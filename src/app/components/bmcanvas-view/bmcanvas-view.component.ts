import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { MatDialog } from "@angular/material";
// import { ErrorComponent } from "../error/error.component";

@Component({
  selector: "app-bmcanvas-view",
  templateUrl: "./bmcanvas-view.component.html",
  styleUrls: ["./bmcanvas-view.component.css"]
})
export class BmcanvasViewComponent implements OnInit {
  public businessModelData = {
    id: "",
    name: "",
    keyPartners: "",
    keyActivities: "",
    valueProposition: "",
    customerRelationships: "",
    customerSegments: "",
    keyResources: "",
    channels: "",
    costStructure: "",
    revenueStreams: ""
  };

  constructor(private router: Router) {}
  // constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("businessModelData")) === null) {
      localStorage.setItem(
        "businessModelData",
        JSON.stringify(history.state.data)
      );
    }

    this.businessModelData =
      history.state.data === undefined
        ? JSON.parse(localStorage.getItem("businessModelData"))
        : history.state.data;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("businessModelData");
  }

  passData() {
    // this.dialog.open(ErrorComponent, {
    //   data: {
    //     message: "Your login information are incorrect!"
    //   }
    // });
    this.router.navigate(["/"], {
      state: { updatedData: this.businessModelData }
    });
  }
}
