import { Component, Input, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { HttpEventType } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  @Input() channelIdFromParent: string = '';
  videoData: any = {
    title: '',
    description: '',
    thumbnail: null,
    video: null,
    idCategory: 0
  };

  uploadProgress: number = 0;

  thumbnailPreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;

  categoryOptions: any = [];

  constructor(private videoService: VideoService, private categorieService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getAllCategories().subscribe((response) => {
      this.categoryOptions = response.categories;
    })
  }

  handleThumbnailInput(event: any): void {
    const file = event.target.files[0];
    this.videoData.thumbnail = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.thumbnailPreview = e.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleVideoInput(event: any): void {
    const file = event.target.files[0];
    this.videoData.video = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.videoPreview = e.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.videoData.title);
    formData.append('description', this.videoData.description);
    formData.append('thumbnail', this.videoData.thumbnail);
    formData.append('video', this.videoData.video);
    formData.append('idCategory', this.videoData.idCategory.toString());

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