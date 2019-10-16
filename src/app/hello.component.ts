import { Component, Input,forwardRef } from '@angular/core';
import {FormBuilder,ControlValueAccessor,  NG_VALIDATORS,
    NG_VALUE_ACCESSOR,} from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [`h1 { font-family: Lato; }`],
   providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HelloComponent),
            multi: true
        }
    ]
})
export class HelloComponent  implements  ControlValueAccessor{
   private _value = [];
  
  id = 'ID_1';
  numeric = false;
  label="IDs";
  maxLimit = 10;
  itemList: any[] = [];
  ENTER_KEY = 13;

  constructor(){

  }
  hasValues(): boolean {
    return this.itemList.length > 0;
  }

  handleKeyDown(event) {
    if (event.keyCode === this.ENTER_KEY) {
      this.handleInput(event);
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  handlePaste(event) {
    setTimeout(() => {
      this.handleInput(event);
    });
  }

  handleInput(event) {
    this.onTouchedCallback();
    const input = _.trim(event.target.value);
    if (input) {
      const val = _.split(input, /\n/g);
      this.convertInputToItems(val);
    }
    event.target.value = '';
  }

  convertInputToItems(input: any[]) {
    if (input.length > 0) {
      let output = this.cleanupInserted(input);
      // if larger than max, then only accept what fits
      const remainingSize = this.maxLimit - this.itemList.length;
      output = output.slice(0, remainingSize);
      this.itemList.unshift(output);
      this.itemList = _.flatten(this.itemList);
      this.onChangeCallback(this.itemList);
      
    }
  }

  remove(index) {
    this.itemList.splice(index, 1);
  }

  cleanupInserted(input: any[]): any[] {
    const output = _.filter(input, i => {
      const isNotEmpty = _.toString(i).length > 0;
      const checkNumeric = this.numeric ? !isNaN(i) : true;

      return isNotEmpty && checkNumeric;
    });
    return _.map(output, o => _.trim(o));
  }

  listSize(): string {
    return `${this.itemList.length} ${this.label}${(this.itemList.length !== 1) ? 's' : ''}`;
  }

  criteriaLimit(): string {
    return `This field is limited to ${this.maxLimit} ${this.numeric ? 'numeric ' : ''}items`;
  }

  onChangeCallback: (_: any) => void = (_: any) => { };
    onTouchedCallback: () => void = () => { };

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

    writeValue(val: any) {
         this._value = val;
    if (val) {
      this.itemList = [];
      this.convertInputToItems(val);
    }
    }
}

