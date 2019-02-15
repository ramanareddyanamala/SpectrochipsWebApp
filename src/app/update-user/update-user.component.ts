import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { RoleService } from '../role.service';
import { Role } from '../role';

import { Observable} from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [UserService, RoleService]
})
export class UpdateUserComponent implements OnChanges {

  // our angular form
  update_user_form: FormGroup;

  @Output() show_read_users_event = new EventEmitter();
  // list of Roles
  @Input() userID;
  @Input() username;

  roles: Role[];
  public loading = false;
  // initialize product & category services
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ){

    // build angular form
    this.update_user_form = this.formBuilder.group({
      username: ["", Validators.required],
      userID:["", Validators.required]
    });
  }

  // user clicks 'create' button
  updateUser(){
    this.loading =true;
    // add product_id in the object so it can be updated
    this.update_user_form.value.userID = this.userID;

    // send data to server
    this.userService.updateUser(this.update_user_form.value)
      .subscribe(
        user => {
          // go back to list of products
          this.loading = false;
          console.log('user info...',user);
          this.readUsers();
        },
        error => {console.log(error); this.loading = false; }
      );
  }

  // user clicks the 'read products' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Read Testers", username:this.username });
  }

  // call the record when 'product_id' was changed
  ngOnChanges(){
    this.loading = true;
    // read one product record
    this.userService.readOneUser(this.userID)
      .subscribe(user => {
        this.loading = false;
        // put values in the form
        this.update_user_form.patchValue({
          username: user.username,
          userID: user.userID
        });
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  // read roles from database
  ngOnInit(){
    this.loading = true;
    this.roleService.readRoles()
      .subscribe(roles => {this.roles = roles['records'], this.loading = false; }, error => {
        this.loading =false;
      });
  }
}
