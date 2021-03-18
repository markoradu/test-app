import { Component, OnInit } from '@angular/core';
import { TeamFinderService } from 'src/app/core/home/team-finder.service';
import { TfMyPostsModalState } from './tf-my-post-modal.state';

@Component({
  selector: 'app-tf-my-posts-modal',
  templateUrl: './tf-my-posts-modal.component.html',
  styleUrls: ['./tf-my-posts-modal.component.scss']
})
export class TfMyPostsModalComponent implements OnInit {
  options: any;
  posts: any;
  isLoading: boolean = true;

  constructor(private state: TfMyPostsModalState, private teamFinderService: TeamFinderService) {
    this.options = this.state.options;
  }

  closeModal() {
    this.state.modal.close();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
      this.getPlayerPosts();
  }

  getPlayerPosts() {
    this.teamFinderService.teamFinderPostsOfAUser().subscribe((posts) => {
      this.posts = posts['body'];
      this.isLoading = true;
    });
  }

  getTeamPosts() {
    this.teamFinderService.teamFinderPostsOfATeam().subscribe((posts) => {
      this.posts = posts['body'];
      this.isLoading = true;
    });
  }

  editHandler(post: any) {
    const data = {
      post,
      action: 'edit',
    };

    this.state.modal.close(data);
  }

  deleteHandler(post: any) {
    const data = {
      id: post.id,
      action: 'delete',
    };

    this.state.modal.close(data);
  }
}
