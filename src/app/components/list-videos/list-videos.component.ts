import { environment } from './../../../environments/environment.development';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss']
})
export class ListVideosComponent {
  environment = environment;

  @Input() title: string = "";
  @Input() videos: any = [];
}
