import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    console.log("requested URL: ",this.expressBaseUrl+endpoint);
    let promise = this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return promise;
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
    
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const endpoint = `/search/${category}/${encodeURIComponent(resource)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      console.log(category+"s")
      if (category === 'album') {
        return data[category+"s"].items.map(item => new AlbumData(item));
      } else if (category === 'track') {
        // return data[category+"s"].items.map(item => new TrackData(item));
        console.log("in the track if")
        let trackInfo:TrackData[];
          trackInfo = data['tracks']['items'].map((track) => {
            return new TrackData(track);
          })
          console.log(trackInfo)
          return trackInfo;
      } else {
        console.log(data[category+"s"])
        return data[category+"s"].items.map(item => new ArtistData(item));
      } 
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let endpoint = `/artist/${encodeURIComponent(artistId)}`;
    return this.sendRequestToExpress(endpoint)
      .then((data) => {
        return new ArtistData(data);
      })
      .catch((error) => {
        return null;
      });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let endpoint = `/artist-related-artists/${encodeURIComponent(artistId)}`;
    
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return data['artists'].map((item) => { return new ArtistData(item) });
    })
    .catch((error) => {
      return null;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let endpoint = `/artist-top-tracks/${encodeURIComponent(artistId)}`;
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return data['tracks'].map((item) => { return new TrackData(item)});
    })
    .catch((error) => {
      return null;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let endpoint = `/artist-albums/${encodeURIComponent(artistId)}`;
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return data['items'].map((item) => { return new TrackData(item)});
    })
    .catch((error) => {
      return null;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let endpoint = `/album/${encodeURIComponent(albumId)}`;
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return new AlbumData(data);
    })
    .catch((error) => {
      return null;
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let endpoint = `/album-tracks/${encodeURIComponent(albumId)}`;
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return data['items'].map((item) => { return new TrackData(item)});
    })
    .catch((error) => {
      return null;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let endpoint = `/track/${encodeURIComponent(trackId)}`;
    return this.sendRequestToExpress(endpoint)
    .then((data) => {
      return new TrackData(data);
    })
    .catch((error) => {
      return null;
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null as any;
  }
}
