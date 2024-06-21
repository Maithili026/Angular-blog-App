import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

    permalink: string = '';
    imgSrc : any = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; 
    selectedImg: any;
    categories: any[] = [];
    postForm: FormGroup;
    
    constructor(
      private categoryService: CategoryService,
      private fb: FormBuilder,
      private postService: PostService
    ) {
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(10)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required]
      });
    }

    ngOnInit(): void {
       this.categoryService.loadData().subscribe(val =>{
       this.categories = val;
       })
    }

    
  //getter method for form
  get fc() {
    return this.postForm.controls;
  }

    onTitleChanged($event: any){
    const title = $event.target.value;
     this.permalink = title.replace(/\s/g, '-');
     console.log(this.permalink);
    }

    //for posting the image
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  
  onSubmit() {
    console.log(this.postForm.value);

    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: ' ',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(this.selectedImg,postData);
  }
}
