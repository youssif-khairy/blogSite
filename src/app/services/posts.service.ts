import { Injectable } from '@angular/core';
import { PostModel } from '../models/post.model';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { SetAllPosts, AddNewPost, EditPost, DeletePost } from '../actions/posts.action';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const Backend_URL = environment.BACKEND_URL + "posts/";
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private store:Store<fromRoot.State>,private http:HttpClient) { }

  setAllPosts(){

    this.http.get(Backend_URL).subscribe((post:PostModel[])=>{
      this.store.dispatch(new SetAllPosts(post))
    })
  }
  getAllPosts(){
    return this.store.select(fromRoot.getAllPosts)
  }
  addPost(title:string,content:string,image:File){
    const postData = new FormData(); //for file upload we don't use json data
    postData.append('title',title);
    postData.append('content',content);
    postData.append('image',image,title);
    this.http.post(Backend_URL,postData).subscribe((p:PostModel) =>{
      this.store.dispatch(new AddNewPost(p))
    })
  }
  
  editPostByID(id:number,title:string,content:string,image:string | File){
    this.store.dispatch(new EditPost({id,model:new PostModel(title,content,image as string)}))

    /* let postData;
    if (typeof(image) == 'string'){
      postData = {
        id,
        title,
        content,
        imagePath:image
      }
    }else{
      postData = new FormData(); //for file upload we don't use json data
      postData.append('id',id);
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image,title); 
    }
    this.http.put('',postData) */
  }
  deletePostByID (id:number){
    this.store.dispatch(new DeletePost({id}))
  }
}
