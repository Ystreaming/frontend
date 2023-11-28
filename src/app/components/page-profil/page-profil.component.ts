import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {
  streamerName: string | null = null;
  streamerData: any;
  videos: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.streamerName = this.route.snapshot.paramMap.get('streamerName');
    if (this.streamerName) {
      this.loadStreamerData(this.streamerName);
    } else {
      console.log("cette page n'existe pas");
    }
  }

  loadStreamerData(streamerName: string) {
    this.http.get<any>('assets/ystreameur.json').subscribe(data => {
      const channels = data.channels;
      const channel = channels.find((ch: any) => ch.name.toLowerCase() === streamerName.toLowerCase());
      this.streamerData = channel;

      if (channel) {
        console.log('Streamer Data:', channel);
        if (channel.videos && channel.videos.length) {
          this.loadVideos(channel.videos);
        } else {
          console.log("Pas de vidéos pour ce streamer");
        }
      } else {
        console.log("Streamer non trouvé");
      }
    });
  }

  loadVideos(videoIds: number[]) {
    this.http.get<any>('assets/video.json').subscribe(data => {
      this.videos = data.filter((video: any) => videoIds.includes(video.id));
      console.log('Videos :', this.videos);
    });
  }
}
