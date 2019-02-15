import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-sequence',
  templateUrl: './delete-sequence.component.html',
  styleUrls: ['./delete-sequence.component.css'],
  providers: [UserService]
})
export class DeleteSequenceComponent {
  @Output() show_read_users_event = new EventEmitter();

  // @Input enable getting the product_id from parent component (AppComponent)

  @Input() username;
  @Input() url;
  public loading = false;
  //deletePublicSequencefile
  constructor(private userService: UserService){}

  deleteSequence(){
    this.loading = true;
    // delete data from database
    this.userService.deletePublicSequencefile(this.url)
      .subscribe(
        user => {
          this.loading = false;
          // show an alert to tell the user if user was deleted or not
          console.log(user);

          // go back to list of products
          this.readUsers();
        },
        error => {console.log(error); this.loading = false; }
      );
  }

  // user clicks the 'read testers' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Read Testers", username:this.username });
  }

}
