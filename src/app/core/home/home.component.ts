import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuccessModalService } from 'src/app/shared/modals/success-modal/success-modal.service';
import { ConfirmationModalService } from 'src/app/shared/modals/tf-modal/confirmation-modal.service';
import { TfUserCreatePostModalService } from 'src/app/shared/modals/tf-modal/tf-user-create-post-modal.service';
import { TfMyPostModalService } from 'src/app/shared/modals/tf-my-posts-modal/tf-my-post-modal.service';
import { TeamFinderService } from './team-finder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private mainFilters: any;
  private advancedFilters: any;
  private mainFiltersLoaded: boolean = false;
  private advancedFiltersLoaded: boolean = false;

  private mainFilters$!: Subscription;
  private advancedFilters$!: Subscription;
  private clearFilters$!: Subscription;

  postsPerPage: number = 20;
  page: number = 1;
  posts!: Array<any>;
  totalPostsNumber: number = 1;
  isLoading = true;

  constructor(
    private tfAddPostService: TfUserCreatePostModalService,
    private successModal: SuccessModalService,
    private teamFinderService: TeamFinderService,
    private tfMyPostsService: TfMyPostModalService,
    private confirmationModal: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.posts = [];
    this.mainFilters$ = this.teamFinderService.mainFilters$
      .asObservable()
      .subscribe((mainFilters) => {
        this.getMainFilters(mainFilters);
        this.getPosts();
      });

    this.advancedFilters$ = this.teamFinderService.advancedFilters$
      .asObservable()
      .subscribe((advFilters) => {
        this.getAdvancedFilters(advFilters);
        this.getPosts();
      });

    this.clearFilters$ = this.teamFinderService.clearFilters$
      .asObservable()
      .subscribe(this.getPosts.bind(this, true));

    this.getPosts();
  }

  ngOnDestroy() {
    if (this.mainFilters$) {
      this.mainFilters$.unsubscribe();
    }
    if (this.advancedFilters) {
      this.advancedFilters$.unsubscribe();
    }
    if (this.clearFilters$) {
      this.clearFilters$.unsubscribe();
    }
  }

  getMainFilters(filters: any) {
    this.mainFilters = filters;
    this.mainFiltersLoaded = true;
  }

  getAdvancedFilters(filters: any) {
    this.advancedFilters = filters;
    this.advancedFiltersLoaded = true;
  }

  collectFilters(): any {
    let filters = {};
    if (this.advancedFiltersLoaded && this.mainFiltersLoaded) {
      filters = { ...this.advancedFilters, ...this.mainFilters };
    }
    return filters;
  }

  getPosts(clear?: boolean) {
    if (clear) {
      this.advancedFilters = {};
      this.mainFilters = {};
    } else {
      this.getTeamPosts();
      this.getPlayerPosts();
    }

  }

  getTeamPosts() {
    const selectedFilters = this.collectFilters();
    const filters = {
      ...selectedFilters,
      ...{ size: this.postsPerPage, page: this.page - 1 },
    };
    this.posts = [];
    this.isLoading = true;
    this.teamFinderService
      .getTeamFinderPosts(filters)
      .subscribe((posts: any) => {
        this.posts = posts.body as Array<any>;
        this.totalPostsNumber = +posts['headers'].get('X-Total-Count');
        this.isLoading = false;
      });
  }

  getPlayerPosts() {
    const selectedFilters = this.collectFilters();
    const filters = {
      ...selectedFilters,
      ...{ size: this.postsPerPage, page: this.page - 1 },
    };
    this.posts = [];
    this.isLoading = true;
    this.teamFinderService
      .getPlayerFinderPosts(filters)
      .subscribe((posts: any) => {
        this.posts = posts.body as Array<any>;
        this.totalPostsNumber = +posts['headers'].get('X-Total-Count');
        this.isLoading = false;
      });
  }

  myPostsHandler() {
    let successMessage: string;
    this.tfMyPostsService.open({}).then(
      (data: any) => {
        if (data.action === 'delete') {
          const confirmMessage = 'Are you sure you want to delete post?';
          successMessage = 'Your post is deleted';
          this.confirmationModal
            .open({
              message: confirmMessage,
            })
            .then((confirmed: any) => {
              if (confirmed) {
                this.teamFinderService
                  .teamFinderDeletePost(data.id)
                  .subscribe((deleted) => {
                    this.successModal
                      .open({
                        text: successMessage,
                      })
                      .then(
                        () => {
                          this.getPosts();
                        },
                        () => {}
                      );
                  });
              }
            });
        } else {
          const editData = {
            post: data.post,
            edit: true,
          };
          if (data.post.finderType === 'User') {
            this.tfAddPostService.open(editData).then(
              (updateData) => {
                if (updateData && updateData.update) {
                  const updateSuccessMessage = 'Your post is updated';
                  this.successModal
                    .open({
                      text: updateSuccessMessage,
                    })
                    .then(
                      () => {
                        this.getPosts();
                      },
                      () => {
                        this.getPosts();
                      }
                    )
                    .catch(() => {
                      this.getPosts();
                    });
                }
              },
              () => {}
            );
          } else {
            this.tfAddPostService.open(editData).then(
              (updateData: any) => {
                if (updateData && updateData.update) {
                  const updateSuccessMessage = 'Your post is updated';
                  this.successModal
                    .open({
                      text: updateSuccessMessage,
                    })
                    .then(
                      () => {
                        this.getPosts();
                      },
                      () => {
                        this.getPosts();
                      }
                    )
                    .catch(() => {
                      this.getPosts();
                    });
                }
              },
              () => {}
            );
          }
        }
      },
      () => {}
    );
  }

  createUserPostHandler() {
    this.tfAddPostService.open({}).then(
      (data: any) => {
        const message = 'Your post is created';
        if (data && data.update) {
          this.successModal
            .open({
              text: message,
            })
            .then(
              () => {
                this.getPosts();
              },
              () => {
                this.getPosts();
              }
            )
            .catch(() => {
              this.getPosts();
            });
        }
      },
      () => {}
    );
  }

  createTeamPostHandler() {
    this.tfAddPostService.open({}).then(
      (data: any) => {
        const message = 'Your post is created';
        if (data && data.update) {
          this.successModal
            .open({
              text: message,
            })
            .then(
              () => {
                this.getPosts();
              },
              () => {
                this.getPosts();
              }
            )
            .catch(() => {
              this.getPosts();
            });
        }
      },
      () => {}
    );
  }

  changePageHandler(page: number) {
    this.page = page;
    this.getPosts();
  }
}
