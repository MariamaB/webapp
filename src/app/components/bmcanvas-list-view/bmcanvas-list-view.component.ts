import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Subscription } from "rxjs";
import gql from "graphql-tag";

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

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getData();
    this.onNewBusinessModel();

    console.log("onINit " + history.state.updatedData);
    if (history.state.updatedData != undefined) {
      console.log("passed data " + history.state.updatedData.name);
      // let updatedBusinessmodel = history.state.updatedData;
      // this.businessModels.map(bm =>
      //   bm.i === updatedBusinessmodel.id ? updatedBusinessmodel : bm
      // );
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
          this.businessModels.push(data.createBusinessModel);
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
          this.businessModels = data.deleteBusinessModel
            ? this.businessModels.filter(
                d => d.id != data.deleteBusinessModel.id
              )
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
          this.businessModels.map(bm =>
            bm.id === data.editBusinessModel.id ? data.editBusinessModel : bm
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
        this.businessModels = data.businessModels;
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
}
