import { Component, forwardRef, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  type ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { map, type Observable, startWith } from 'rxjs';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';

@Component({
  selector: 'input-autocomplete',
  imports: [
    MatInput,
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatLabel,
    MatError,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Autocomplete),
      multi: true,
    },
  ],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.module.scss',
})
export class Autocomplete implements ControlValueAccessor {
  public options = input<string[]>([]);
  public placeholder = input<string>('Выберите значение');
  public label = input<string | null>(null);
  public errors = input<string[]>([]);

  protected readonly control = new FormControl<string>('');
  protected filteredOptions: Observable<string[]>;

  constructor() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );

    this.control.valueChanges.subscribe(value => {
      this.onChange(value ?? '');
      this.onTouched();
    });
  }

  public writeValue(value: string | null): void {
    this.control.setValue(value ?? '', { emitEvent: false });
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  private onChange: (value: string) => void = () => {};

  private onTouched: () => void = () => {};

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options().filter((option) => option.toLowerCase().includes(filterValue));
  }
}
