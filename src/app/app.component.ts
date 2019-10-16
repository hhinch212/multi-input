import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  testGroup: FormGroup
  constructor(private fb: FormBuilder){
    this.testGroup = fb.group({ids: ''});
  }
}
