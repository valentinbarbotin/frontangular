import { HttpEventType, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RESTService } from '../services/rest.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  selectedFiles4Upload?: FileList;
  progression = 0;
  uploadDone = false;
  file?: File | null;

  makeGET() {
    console.log("requete go")

    this.RESTService.GET('test').subscribe(
      response => {
        console.log(response)
        alert(response)
      },
      error => {
        console.log(error.error.error)
        alert(error.error.error)
      }
    )

  }

  getToken() {
    return this.RESTService.token;
  }


  selectFiles(event: any) {
    this.selectedFiles4Upload = event.target.files;
  }

  uploadFile(file: File | null | undefined) {
    this.progression = 0;
    
    if (file) {
      console.log(file)
      
      const formData = new FormData();
      formData.append("file", file);

      // this.RESTService.POST('users/upload', formData).subscribe(
      //   event => {
      //     if (event.type === HttpEventType.UploadProgress) {

      //     }
      //   }
      // )

      this.RESTService.POST('users/upload', formData).subscribe(
        (reponse: any) => {
          console.log("reponse")
          console.log(reponse)
          if (reponse.type === HttpEventType.UploadProgress) {
            this.progression = Math.round(100 * reponse.loaded  / reponse.total);
          } else if (reponse instanceof HttpResponse) {
            this.uploadDone = true;
          }
        },
        (error) => {
          console.log("error")
          console.log(error)
        }
      )
      
    }
  }

  upload() {
    this.progression = 0;
    this.uploadDone = false;
    this.file = this.selectedFiles4Upload?.item(0);
    this.uploadFile(this.file)
  }

  constructor(
    private RESTService: RESTService
  ) { }

  ngOnInit(): void {
  }

}
