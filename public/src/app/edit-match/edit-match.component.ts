import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';
import { SocketService } from '../socket.service';

@Component({
  selector: "app-edit-match",
  templateUrl: "./edit-match.component.html",
  styleUrls: ["./edit-match.component.css"]
})
export class EditMatchComponent implements OnInit {
  matchID = null;
  errors = null;
  matchToEdit = {};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    private _SocketService: SocketService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["matchid"]);
      this.matchID = params["matchid"];
      this.getMatchByIdFromService(this.matchID);
    });
  }
  putMatch(updatedMatch) {

    console.log(updatedMatch);
    let observable = this._httpService.putMatch(updatedMatch);
    observable.subscribe(data => {
      console.log("put match", data);

      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.matchToEdit = {};
        this._SocketService.sendMatchUpdate(updatedMatch);
        this._router.navigate([`/read/${updatedMatch._id}`]);
        this.errors = null;
      }
    });
  }
  getMatchByIdFromService(id?: string) {
    let observable = this._httpService.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchToEdit = data['data'][0];
      console.log('this.matchToEdit', this.matchToEdit);
    });
  }
}
