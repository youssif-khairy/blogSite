import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostModel } from 'src/app/models/post.model';
import { imgValidator } from "./image.validator";

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  form: FormGroup;
  imagePreview:string;
  constructor(private activeRoute: ActivatedRoute, private postService: PostsService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, {validators: [Validators.required] }),
      image: new FormControl(null, {validators: [Validators.required] ,asyncValidators:[imgValidator]})
    })
    this.activeRoute.params.subscribe((par) => {
      this.id = + par['id']
      if (par['id']) this.editMode = true;
      else this.editMode = false;
      this.postService.getAllPosts().subscribe((posts: PostModel[]) => {
        if (posts) {
          posts.map((post, index) => {
            if (index == this.id) {
              this.form.setValue({
                title: post.title,
                content : post.content,
                image: post.imagePath
              });
            }
          })

        }
      })
    })
  }
  onSubmit() {
    if (this.form.invalid) return;
    if (!this.editMode) // add
    {
      this.postService.addPost(this.form.value.title, this.form.value.content,this.form.value.image)
      this.form.reset()
    }
    else // edit 
    {
      this.postService.editPostByID(this.id, this.form.value.title, this.form.value.content,null)
      this.form.value.title = '';
      this.form.value.content = '';
      this.router.navigate(['/posts'])
    }
  }

  onImageChange(event:Event){
    const file = (event.target as HTMLInputElement).files[0]; // take first file always
    this.form.patchValue({
      image: file
    })
    this.form.get('image').updateValueAndValidity(); //sha3'al el validator ba3d lama set el value
    
    // to read file
    const reader = new FileReader()
    reader.onload = ()=>{
      this.imagePreview = (reader.result as string)
    }
    if (file)
      reader.readAsDataURL(file)
    
  }

}
