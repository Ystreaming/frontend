import { Component, Input } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  @Input() channelIdFromParent: string = '';
  videoData: any = {
    title: '',
    description: '',
    thumbnail: null,
    video: null,
    idCategory: 0
  };

  uploadProgress: number = 0;

  categoryOptions: { name: string, value: number }[] = [
    { name: 'Catégorie 1', value: 1 },
    { name: 'Catégorie 2', value: 2 },
    { name: 'Catégorie 3', value: 3 },
  ];

  constructor(private videoService: VideoService) {}

  handleThumbnailInput(event: any) {
    this.videoData.thumbnail = event.target.files[0];
  }

  handleVideoInput(event: any) {
    this.videoData.video = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.videoData.title);
    formData.append('description', this.videoData.description);
    formData.append('thumbnail', this.videoData.thumbnail);
    formData.append('video', this.videoData.video);

    formData.append('idCategory', this.videoData.idCategory);

    this.videoService.createVideo(formData).subscribe((event: any) => {
      if (event.type === HttpEventType.Sent) {
        console.log('Request sent to server');
      } else if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        console.log(`Upload progress: ${this.uploadProgress}%`);
      } else if (event.type === HttpEventType.Response) {
        console.log('Réponse du service :', event);
      }
    });
  }
}
