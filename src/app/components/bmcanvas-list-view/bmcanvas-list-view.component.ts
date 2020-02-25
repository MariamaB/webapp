import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Subscription } from "rxjs";
import gql from "graphql-tag";
import { OverlayComponent } from "../overlay/overlay.component";
import { MatDialog } from "@angular/material";

const BUSINESS_MODEL_QUERY = gql`
  query businessModels {
    businessModels {
      id
      name
      keyPartners
      keyActivities
      valueProposition
      customerRelationships
      customerSegments
      keyResources
      channels
      costStructure
      revenueStreams
    }
  }
`;

const BUSINESS_MODEL_CREATE = gql`
  mutation createBusinessModel($name: String!) {
    createBusinessModel(name: $name) {
      id
      name
      keyPartners
      keyActivities
      valueProposition
      customerRelationships
      customerSegments
      keyResources
      channels
      costStructure
      revenueStreams
    }
  }
`;

const BUSINESS_MODEL_DELETE = gql`
  mutation deleteBusinessModel($id: ID!) {
    deleteBusinessModel(id: $id) {
      id
    }
  }
`;
const BUSINESS_MODEL_EDIT = gql`
  mutation editBusinessModel($businessModel: BMInput) {
    editBusinessModel(businessModel: $businessModel) {
      id
      name
      keyPartners
      keyActivities
      valueProposition
      customerRelationships
      customerSegments
      keyResources
      channels
      costStructure
      revenueStreams
    }
  }
`;

const BUSINESS_MODEL_ON_EDIT = gql`
  subscription businessModelOnEdit {
    businessModelOnEdit {
      id
      name
      keyPartners
      keyActivities
      valueProposition
      customerRelationships
      customerSegments
      keyResources
      channels
      costStructure
      revenueStreams
    }
  }
`;

const ON_NEW_BUSINESS_MODEL = gql`
  subscription newBusinessModel {
    newBusinessModel {
      id
      name
      keyPartners
      keyActivities
      valueProposition
      customerRelationships
      customerSegments
      keyResources
      channels
      costStructure
      revenueStreams
    }
  }
`;

@Component({
  selector: "app-bmcanvas-list-view",
  templateUrl: "./bmcanvas-list-view.component.html",
  styleUrls: ["./bmcanvas-list-view.component.css"]
})
export class BmcanvasListViewComponent implements OnInit {
  businessModels: any[];
  businessModel: {};
  loading = true;
  error: any;
  public name = "My business name!";

  private query: Subscription;

  constructor(private apollo: Apollo, private dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
    this.onNewBusinessModel();

    console.log("onINit " + history.state.updatedData);
    if (history.state.updatedData !== undefined) {
      console.log("passed data " + history.state.updatedData.name);
      this.updateBusinessModel(history.state.updatedData);
    }
  }

  ngOnDestroy() {
    this.query.unsubscribe();
  }

  public createNewBusinessModel() {
    this.query = this.apollo
      .mutate({
        mutation: BUSINESS_MODEL_CREATE,
        variables: {
          name: this.name
        }
      })
      .subscribe(
        ({ data }) => {
          const { createBusinessModel } = data;
          this.businessModels.push(createBusinessModel);
        },
        error => {
          console.log(error);
          alert("Creating " + this.name + " failed!");
        }
      );
  }

  public deleteBusinessModel(bmId) {
    this.apollo
      .mutate({
        mutation: BUSINESS_MODEL_DELETE,
        variables: {
          id: bmId
        }
      })
      .subscribe(
        ({ data }) => {
          const { deleteBusinessModel } = data;
          this.businessModels = deleteBusinessModel
            ? this.businessModels.filter(d => d.id !== deleteBusinessModel.id)
            : this.businessModels;
        },
        error => {
          console.log(error);
          alert("Deleting " + bmId.name + " failed!");
        }
      );
  }

  public editBusinessModel(businessModel?) {
    this.apollo
      .mutate({
        mutation: BUSINESS_MODEL_EDIT,
        variables: {
          businessModel
        }
      })

      .subscribe(
        ({ data }) => {
          const { editBusinessModel } = data;
          this.businessModels.map(bm =>
            bm.id === editBusinessModel.id ? editBusinessModel : bm
          );
        },
        error => {
          console.log(error);
          alert("Updating " + name + " failed!");
        }
      );
  }

  async onNewBusinessModel() {
    this.query = this.apollo
      .subscribe({
        query: ON_NEW_BUSINESS_MODEL,
        variables: {}
      })
      .subscribe(({ data }) => {
        const { newBusinessModel } = data;
        // if (!this.businessModels.some(bm => bm.id === newBusinessModel.id)) {
        this.businessModels.push(newBusinessModel);
        // }
      });
  }

  private getData() {
    this.query = this.apollo
      .watchQuery({
        query: BUSINESS_MODEL_QUERY
      })
      .valueChanges.subscribe(({ data }) => {
        const { businessModels } = data;
        this.businessModels = businessModels;
      });
  }

  private updateBusinessModel(businessModel) {
    this.editBusinessModel({
      id: businessModel.id,
      name: businessModel.name,
      keyPartners: businessModel.keyPartners,
      keyActivities: businessModel.keyActivities,
      valueProposition: businessModel.valueProposition,
      customerRelationships: businessModel.customerRelationships,
      customerSegments: businessModel.customerSegments,
      keyResources: businessModel.keyResources,
      channels: businessModel.channels,
      costStructure: businessModel.costStructure,
      revenueStreams: businessModel.revenueStreams
    });
  }

  passDataToOverlay(businessModelTitel: String) {
    const dialogRef = this.dialog.open(OverlayComponent, {
      width: "90%",
      disableClose: true,
      data: {
        name: businessModelTitel ? businessModelTitel : "Title",
        message: "Overlay on construction!"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
