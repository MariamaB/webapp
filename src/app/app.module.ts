import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { BmcanvasListViewComponent } from "./components/bmcanvas-list-view/bmcanvas-list-view.component";
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { BmcanvasViewComponent } from "./components/bmcanvas-view/bmcanvas-view.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const appRoutes: Routes = [
  {
    path: "",
    // path: "bmcanvas-list-view",
    component: BmcanvasListViewComponent
  },
  {
    path: "bmcanvas-view",
    component: BmcanvasViewComponent
  },
  { path: "**", component: PageNotFoundComponent }
  // { path: 'hero/:id', component: HeroDetailComponent },
  // {path: '', redirectTo: '/heroes', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    BmcanvasListViewComponent,
    BmcanvasViewComponent,
    PageNotFoundComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatDialogModule,

    BrowserModule,
    BrowserAnimationsModule,

    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    TextFieldModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [OverlayComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
