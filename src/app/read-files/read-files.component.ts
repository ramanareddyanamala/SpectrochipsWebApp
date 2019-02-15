import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Observable} from 'rxjs';
import {User} from '../user';
import {Role} from "../role";
@Component({
  selector: 'app-read-files',
  templateUrl: './read-files.component.html',
  styleUrls: ['./read-files.component.css'],
  providers:[UserService]
})
export class ReadFilesComponent implements OnChanges {


  /*
      @Output will tell the parent component (AppComponent)
      that an event has happened (via .emit(), see readProducts() method below)
  */
  @Output() show_read_users_event = new EventEmitter();
  @Output() show_read_files_event = new EventEmitter();
  @Input() username;
  // @Input means it will accept value from parent component (AppComponent)
  @Input() url;
  public loading = false;
  // initialize product service
  constructor(private userService: UserService) {}
  user: User;
  jsdata: string;
  // user clicks the 'read products' button
  readUsers() {
    this.show_read_users_event.emit({ title: "Testers List", username:this.username });
  }

  // call the record when 'product_id' was changed
  ngOnChanges() {
    this.loading = true;
    this.userService.readJsonData(this.url)
      .subscribe(jsdata => {this.jsdata = JSON.stringify(jsdata,undefined,2), this.loading = false; },error => {
        this.loading = false;
        this.jsdata = 'Not a Valid JSON Data';
      });
  }
}
