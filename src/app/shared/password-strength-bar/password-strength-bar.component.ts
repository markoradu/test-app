import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss'],
})
export class PasswordStrengthBarComponent implements OnInit, OnChanges {
  // input for the password form control
  @Input() public password!: string;
  // input for changing the colors of the bars
  // input for changing the colors of the bars
  @Input() colors!: [string, string, string, string];
  // input for changing the messages below the bar
  @Input() messages!: [string, string, string, string];
  // input for changing the deisplay of message below the bars
  @Input() public msgDisplay: boolean = true;
  // input for changing the default debounce time
  @Input() public debounceTimer: number = 300;
  // output that emits the strength value of the password
  @Output() passwordStrength = new EventEmitter<number>();
  // debounce for pass value
  passDebouncer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // bars
  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;
  // message to display
  msg: string = '';
  msgColor!: string;


  ngOnInit(): void {
    this.passDebouncer$
      .pipe(debounceTime(this.debounceTimer))
      .subscribe((value) => {
        this.passwordStrength.emit(value);
      });
  }

  checkStrength(pass: string): number {
    // the value assigned to the property will be used to determine the strength of the password
    let force = 0;
    // the regex of special characters, lowercase test, uppercase test, number test and regex test
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(pass);
    const upperLetters = /[A-Z]+/.test(pass);
    const numbers = /[0-9]+/.test(pass);
    const symbols = regex.test(pass);
    // array that contains the regular expressions
    const flags = [lowerLetters, upperLetters, numbers, symbols];
    // value that is incremented inside the loop depending on the regular expression that is satisfied
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
    // checks if the password length is greater than 8 and then multiplies the passMatches value
    force += 2 * pass.length + (pass.length >= 8 ? 1 : 0);
    force += passedMatches * 10;
    // length of the password  of at least 8 characters check
    force = pass.length <= 8 ? Math.min(force, 10) : force;
    // the final force value is set based on the value of passedMatches
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    // return type of the method
    return force;
  }
  // intercepts the value change of the password
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.password.currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const col = this.getColor(this.checkStrength(password));
      this.setBarColors(col.index, col.color);
      const pwdStrength = this.checkStrength(password);
      this.passDebouncer$.next(pwdStrength);

      switch (pwdStrength) {
        case 10:
          this.msg = this.messages[0];
          break;
        case 20:
          this.msg = this.messages[1];
          break;
        case 30:
          this.msg = this.messages[2];
          break;
        case 40:
          this.msg = this.messages[3];
          break;
      }
    } else {
      this.msg = '';
    }
  }
  // set the colors in the colors array on the bars
  private getColor(score: number) {
    let index = 0;
    switch (score) {
      case 10:
        index = 0;
        break;
      case 20:
        index = 1;
        break;
      case 30:
        index = 2;
        break;
      case 40:
        index = 3;
        break;
      default:
        index = 4;
    }
    this.msgColor = this.colors[index];
    return {
      index: index + 1,
      color: this.colors[index],
    };
  }
  // set a default color for the bars
  private setBarColors(count: number, col: string): void {
    for (let n = 0; n < count; n++) {
      //@ts-ignore
      this['bar' + n] = col;
    }
  }
}
