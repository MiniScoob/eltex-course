import { Directive, ElementRef, HostListener, forwardRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file][formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessor),
      multi: true
    }
  ]
})
export class FileValueAccessor implements ControlValueAccessor {  
  private onChange: any = () => {};
  private onTouched: any = () => {};
  
  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('change', ['$event.target'])
  onFileChange(target: EventTarget | null): void {
    const input = target as HTMLInputElement;
    const file = input.files?.length ? input.files[0] : null;
    this.onChange(file);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const element = this.elementRef.nativeElement;

    if (isDisabled) {
      this.renderer.setAttribute(element, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(element, 'disabled');
    }
  }

  /* Not supported */
  writeValue(obj: any): void {}
}
