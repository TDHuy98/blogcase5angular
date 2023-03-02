import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {Router} from '@angular/router';
import {AddPostService} from "../add-post.service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  ngOnInit(): void {
  }

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  //
  constructor(private addPostService: AddPostService, private  router:Router, private sessionStorage: SessionStorageService) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id:'',
      content: '',
      title: '',
      username: ''
    }
  }


  addPost() {
    // @ts-ignore
    this.postPayload.content = this.addPostForm.get('body').value;
    // @ts-ignore
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.username = this.sessionStorage.retrieve("username")
    this.addPostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
      console.log('posted success')
    }, error => {
      console.log('Failure Response');
    })
  }

}
