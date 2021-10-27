import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timesheet';

  constructor(public http: HttpClient) {}

  public connectServer() {
    this.http.get('url')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
