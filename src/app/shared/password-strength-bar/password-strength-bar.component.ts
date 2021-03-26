import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss'],
})
export class PasswordStrengthBarComponent implements OnInit, OnChanges {
  @Input() public passwordToCheck!: string;

  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;

  private colors: string[] = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  msg!: string;
  msgColor!: string;

  constructor() {}

  ngOnInit(): void {}

  checkStrength(pass: string): number {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(pass);
    const upperLetters = /[A-Z]+/.test(pass);
    const numbers = /[0-9]+/.test(pass);
    const symbols = regex.test(pass);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * pass.length + (pass.length >= 8 ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = pass.length <= 8 ? Math.min(force, 10) : force;

    // 7
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const col = this.getColor(this.checkStrength(password));
      this.setBarColors(col.index, col.color);
      const pwdStrength = this.checkStrength(password);
      switch (pwdStrength) {
        case 10:
          this.msg = 'Poor';
          break;
        case 20:
          this.msg = 'Not Good';
          break;
        case 30:
          this.msg = 'Average';
          break;
        case 40:
          this.msg = 'Good';
          break;
      }
    } else {
      this.msg = '';
    }
  }

  private getColor(score: number) {
    let index = 0;
    if (score === 10) {
      index = 0;
    } else if (score === 20) {
      index = 1;
    } else if (score === 30) {
      index = 2;
    } else if (score === 40) {
      index = 3;
    } else {
      index = 4;
    }
    this.msgColor = this.colors[index];
    return {
      index: index + 1,
      color: this.colors[index],
    };
  }

  private setBarColors(count: number, col: string): void {
    for (let n = 0; n < count; n++) {
      //@ts-ignore
      this['bar' + n] = col;
    }
  }
}
