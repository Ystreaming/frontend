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
    img: null,
    url: null,
    idCategory: 0,
    language: 'fr',
    time: 123
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
    this.videoData.img = file;
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
    this.videoData.url = file;
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
    formData.append('img', this.videoData.img);
    formData.append('url', this.videoData.url);
    formData.append('idCategory', this.videoData.idCategory.toString());
    formData.append('language', 'fr');
    formData.append('time', '123');
    formData.append('idChannel', this.channelIdFromParent);

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