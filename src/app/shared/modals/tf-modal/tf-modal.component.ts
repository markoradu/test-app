import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AssetsService } from 'src/app/core/home/assets.service';
import { TeamFinderService } from 'src/app/core/home/team-finder.service';
import { TfUserCreatePostModalState } from './tf-user-create-post-modal.state';

@Component({
  selector: 'app-tf-modal',
  templateUrl: './tf-modal.component.html',
  styleUrls: ['./tf-modal.component.scss'],
})
export class TfModalComponent implements OnInit {
  faMinus = faMinus;
  faPlus = faPlus;
  faTimes = faTimes;
  addPostForm!: FormGroup;
  editMode: boolean = false;
  filters: any;
  gameDropdownLabel: string = 'Game';
  formInitiated: boolean = false;
  formChanges$!: Subscription;
  isFormValid: boolean = false;
  options: any;
  gameLabel: string = 'Game';
  selectedGame: any;
  selectedRank: any;
  selectedRole: any;
  gamesDropdown!: NgbDropdown;
  ranksDropdown!: NgbDropdown;
  roleDropdown!: NgbDropdown;

  get gameId_in(): FormArray | any {
    return this.addPostForm
      ? (this.addPostForm.controls['gameId'] as FormArray)
      : null;
  }

  get roleId_in(): FormArray | any {
    return this.addPostForm
      ? (this.addPostForm.controls['gameRolesIds'] as FormArray)
      : null;
  }

  get rankId_in(): FormArray | any {
    return this.addPostForm
      ? (this.addPostForm.controls['rankId'] as FormArray)
      : null;
  }

  constructor(
    private changeDetection: ChangeDetectorRef,
    private fb: FormBuilder,
    private teamFinderService: TeamFinderService,
    private assetsService: AssetsService,
    public activeModal: NgbActiveModal,
    private state: TfUserCreatePostModalState
  ) {
    this.options = this.state.options;
  }

  ngOnInit(): void {
    this.gameDropdownLabel = this.gameLabel;
    this.getFilters();
    this.editMode = this.options.edit;
  }

  private getFilters() {
    const games = this.assetsService.getFilters('espl-games');
    forkJoin([games]).subscribe((filters) => {
      this.filters = {
        games: filters[0],
      };
      this.initForm(filters);
    });
  }

  private initForm(filters?: any) {
    this.addPostForm = this.fb.group({
      gameId: this.populateForm(filters[0], 'gameId'),
    });

    this.formChanges$ = this.addPostForm.valueChanges
      .pipe(debounceTime(20), distinctUntilChanged())
      .subscribe(this.checkValidity.bind(this));
    if (this.editMode) {
      this.populateEditData();
    }
    this.formInitiated = true;
    this.changeDetection.markForCheck();
  }

  private checkValidity(value: any) {
    let minLength = 1;
    if (this.filters['roles'] && this.filters['roles'].length > 0) {
      minLength++;
    }
    if (this.filters['ranks'] && this.filters['ranks'].length > 0) {
      minLength++;
    }
    this.isFormValid =
      Object.keys(this.extractChecked(value)).length === minLength;
    this.changeDetection.markForCheck();
  }

  submitForm(addPostForm: FormGroup) {
    const values = this.extractChecked(addPostForm.value);
    const payload: any = {
      gameId: values['gameId'][0],
    };
    if (this.filters['roles'] && this.filters['roles'].length > 0) {
      payload['gameRolesIds'] = values['gameRolesIds'];
    }
    if (this.filters['ranks'] && this.filters['ranks'].length > 0) {
      payload['rankId'] = values['rankId'][0];
    }
    const update = {
      update: true,
    };
    if (!this.editMode) {
      this.teamFinderService.addUserPost(payload).subscribe(() => {
        this.state.modal.close(update);
      });
    } else {
      const editPayload = { ...payload, id: this.options.post.id };
      this.teamFinderService.updateUserPost(editPayload).subscribe(() => {
        this.state.modal.close(update);
      });
    }
  }

  closeModal() {
    this.state.modal.close();
  }

  populateForm(filters: Array<any>, name?: string): FormArray {
    const arr: Array<any> = [];
    const items = filters;
    items.forEach((element: object) => {
      arr.push(this.newFormItem(element, name));
    });

    return this.fb.array(arr);
  }

  newFormItem(item: any, name?: string) {
    return this.fb.group({
      id: item['id'],
      name: item['name'],
      checked: false,
    });
  }

  gameSelected(game: any) {
    this.selectedRank = undefined;
    if (!game.checked) {
      this.selectedGame = undefined;
      this.gameDropdownLabel = this.gameLabel;
    }
    if (!this.selectedGame && game.checked) {
      this.selectedGame = game;
      this.gameDropdownLabel = game.name;
      this.getRolesAndRanks(game.id);
    }
    if (this.selectedGame && this.selectedGame.id !== game.id) {
      this.gameId_in.controls
        .find((control: any) => control.value.id === this.selectedGame.id)
        .patchValue({
          checked: false,
        });
      this.selectedGame = game;
      this.gameDropdownLabel = game.name;
      this.getRolesAndRanks(game.id);
    }
    if (game.checked && this.gamesDropdown) {
      this.gamesDropdown.close();
    }
    this.changeDetection.markForCheck();
  }

  rankSelected(rank: any) {
    if (!rank.checked) {
      this.selectedRank = undefined;
    }
    if (!this.selectedRank && rank.checked) {
      this.selectedRank = rank;
    }
    if (this.selectedRank && this.selectedRank.id !== rank.id) {
      this.rankId_in.controls
        .find((control: any) => control.value.id === this.selectedRank.id)
        .patchValue({
          checked: false,
        });
      this.selectedRank = rank;
    }
    if (rank.checked && this.ranksDropdown) {
      this.ranksDropdown.close();
    }
    this.changeDetection.markForCheck();
  }

  roleSelected(role: any) {
    if (!role.checked) {
      this.selectedRole = undefined;
    }
    if (!this.selectedRole && role.checked) {
      this.selectedRole = role;
    }
    for (let i = 0; i < this.roleId_in.controls.length; i++) {
      const element: any = this.roleId_in?.controls[i];
      if (element.value.checked === true) {
        this.selectedRole = role;
        break;
      } else {
        this.selectedRole = undefined;
      }
    }
    this.changeDetection.markForCheck();
  }

  getRolesAndRanks(gameId: number) {
    const roles = this.teamFinderService.getGameRoles(gameId);
    const ranks = this.teamFinderService.getGameRanks(gameId);
    forkJoin([roles, ranks]).subscribe((gameResults) => {
      this.filters['roles'] = gameResults[0];
      this.filters['ranks'] = gameResults[1];
      this.addPostForm.removeControl('gameRolesIds');
      this.addPostForm.addControl(
        'gameRolesIds',
        this.populateForm(gameResults[0] as Array<any>)
      );
      this.addPostForm.removeControl('rankId');
      this.addPostForm.addControl(
        'rankId',
        this.populateForm(gameResults[1] as Array<any>)
      );

      const data: any = this.options.post;
      if (data) {
        this.roleId_in?.controls.forEach((control: any) => {
          if (data['gameRolesIds'].includes(control.value.id)) {
            control.patchValue({
              checked: true,
            });
          }
        });
        const rankControl: any = this.rankId_in?.controls.find(
          (control: any) => control.value.id === data.rankId
        );
        if (rankControl) {
          rankControl.patchValue({
            checked: true,
          });
          this.selectedRank = {
            id: data.rankId,
            checked: true,
          };
        }
      }
    });
  }

  extractChecked(formObj: any) {
    const tmpForm: any = {};

    for (const key in formObj) {
      if (formObj.hasOwnProperty(key) && formObj[key] != null) {
        const element = formObj[key];
        if (typeof element !== 'string' && typeof element !== 'number') {
          tmpForm[key] = [];

          element.map((elem: any) => {
            if (elem['checked']) {
              tmpForm[key].push(elem['id']);
            }
          });
        } else {
          tmpForm[key] = element.toString();
        }
      }
    }
    for (const key in tmpForm) {
      if (tmpForm.hasOwnProperty(key) && tmpForm[key] != null) {
        if (tmpForm[key].length === 0) {
          delete tmpForm[key];
        }
      }
    }

    return tmpForm;
  }

  private populateEditData() {
    const data = this.options.post;
    const game = {
      id: data.gameId,
      name: data.game,
      checked: true,
    };
    this.gameId_in.controls
      .find((control: any) => control.value.id === data.gameId)
      .patchValue({
        checked: true,
      });
    this.gameSelected(game);
  }
}
