import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  templateUrl: "overlay.component.html",
  styleUrls: ["overlay.component.css"]
})
export class OverlayComponent {
  public stateChange = 0;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eightFormGroup: FormGroup;
  ninthFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<OverlayComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ["", Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ["", Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ["", Validators.required]
    });
    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl: ["", Validators.required]
    });
    this.eightFormGroup = this._formBuilder.group({
      eightCtrl: ["", Validators.required]
    });
    this.ninthFormGroup = this._formBuilder.group({
      ninthCtrl: ["", Validators.required]
    });
  }
  public closeDialog() {
    this.dialogRef.close();
    // this.dialogRef.close(`${form.value.filename}`);
  }
}
