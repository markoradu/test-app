import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DisplayFilters } from 'src/app/shared/enums/display.enum';

@Component({
  selector: 'app-tournaments-navigation',
  templateUrl: './tournaments-navigation.component.html',
  styleUrls: ['./tournaments-navigation.component.scss'],
})
export class TournamentsNavigationComponent implements OnInit {
  displayFilters = DisplayFilters;
  @Output() toggleLayout = new EventEmitter();
  radioSelected: any;

  constructor() {}

  ngOnInit(): void {
    this.radioSelected = this.displayFilters.Basic;
  }

  switchLayout() {
    this.toggleLayout.emit(this.radioSelected);
  }
}
