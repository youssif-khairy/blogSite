import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  constructor(private postService:PostsService,
    private store:Store<fromRoot.State>,
    private route:Router) { }
  allPosts$:Observable<PostModel[]>
  ngOnInit(): void {
    this.allPosts$ = this.store.select(fromRoot.getAllPosts)
  }
  editPost(index:number){
    this.route.navigate([`posts/${index}/edit`])
  }
  deletePost(index:number){
    this.postService.deletePostByID(index)
  }

}
