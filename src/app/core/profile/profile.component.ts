import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faEye, faPen, faUpload } from '@fortawesome/free-solid-svg-icons';
import { IAccount } from 'src/app/shared/interfaces/account.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // ICONS
  faEye = faEye;
  faPen = faPen;
  faUpload = faUpload;

  // USER DATA
  profile!: IAccount;

  // IMAGE
  currentCoverImage: any;
  originalCoverImage: any;
  currentProfileImage: any;
  originalProfileImage: any;
  imageEditedProfile: boolean = false;
  imageEditedCover: boolean = false;

  imageForm: any = {
    coverImage: { file: null },
    profileImage: { file: null },
  };
  constructor(
    private profileService: ProfileService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentCoverImage = this.profile?.coverImageUrl;
    this.originalCoverImage = this.profile?.coverImageUrl;
    this.currentProfileImage = this.profile?.images?.medium.length
      ? this.profile?.images?.medium
      : this.profile?.images?.original;
    this.originalProfileImage = this.profile?.images?.medium;

    this.profileService.getAccount().subscribe((result) => {
      this.profile = result;
    });
  }

  selectProfileImage(event: any) {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();

    this.imageForm.profileImage.file = file;

    fileReader.onloadend = (e) => {
      this.currentProfileImage = fileReader.result;
      this.imageEditedProfile = true;
      this.saveProfileImages();
      this.changeDetection.markForCheck();
    };

    fileReader.readAsDataURL(file);
  }

  buildForm(type: any, file: any): any {
    const data = {
      form: (null as unknown) as FormData,
      query: null as any,
    };

    data.form = new FormData();
    data.form.append('file', file);

    if (type === 'profile') {
      data.query = { position: '0', type: 'profile' };
    }

    return data;
  }

  uploadImage(form: any, query: any): Promise<any> {
    return this.profileService.uploadImages(form, query).toPromise();
  }

  uploadProfileImage(profileForm: any) {
    this.uploadImage(profileForm.form, profileForm.query).then((result) => {
      if (this.imageForm.coverImage.file) {
        this.uploadCoverImage();
      } else {
        this.imageEditedProfile = false;
      }
      this.updateProfileData();
    });
  }

  uploadCoverImage() {
    const coverForm = this.buildForm('cover', this.imageForm.coverImage.file);

    this.uploadImage(coverForm.form, coverForm.query).then((result) => {
      this.updateProfileData();
      this.imageEditedCover = false;
    });
  }

  updateProfileData() {
    this.profileService.getAccount().subscribe((res) => {
      this.profile = res;
      this.changeDetection.markForCheck();
    });
  }

  saveProfileImages() {
    let profileForm: any;

    if (this.imageForm.profileImage.file) {
      profileForm = this.buildForm('profile', this.imageForm.profileImage.file);
    }

    if (profileForm) {
      this.uploadProfileImage(profileForm);
    }

    this.imageEditedProfile = false;
  }
}
