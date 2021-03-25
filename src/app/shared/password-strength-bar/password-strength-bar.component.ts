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
  @Input() passwordToCheck!: string;
  @Input() barLabel!: string;

  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;
  bar4!: string;

  colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  constructor() {}

  ngOnInit(): void {}

  static measureStrength(pass: string) {
    let score: number = 0;
    // award every unique letter until 5 repetitions
    let letters: any = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations: any = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };
    let variationCount: number = 0;
    for (let check in variations) {
      variationCount += variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  getColor(score: number) {
    let idx: number = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    let password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      let c = this.getColor(
        PasswordStrengthBarComponent.measureStrength(password)
      );
      this.setBarColors(c.idx, c.col);
    }
  }
  setBarColors(count: any, col: any) {
    for (let n = 0; n < count; n++) {
      // @ts-ignore
      this['bar' + n] = col;
    }
  }
}
