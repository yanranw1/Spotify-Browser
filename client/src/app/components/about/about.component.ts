import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';
import { ProfileData } from '../../data/profile-data';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

  fetchAboutMeFromSpotify() {

    // Make an HTTP request to the Spotify API using the Spotify service.
    this.spotifyService.aboutMe().then((data: ProfileData) => {
      this.name = data.name;
      this.profile_link = data.spotifyProfile;
      this.profile_pic = data.imageURL;
    }).catch((error) => {
      console.error('Error fetching data from Spotify:', error);
    });
  }

}
