import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {

  constructor(private http: HttpClient) {}

  getfiles() {
    return this.http.get(`${environment.ApiUrl}/files`);
  }

  getfile(filename) {
    return this.http.get(`${environment.ApiUrl}/files/${filename}`);
  }

  delete(filename) {
    return this.http.delete(`${environment.ApiUrl}/files/${filename}`);
  }

  upload(fileToUpload: File){
    const formdata: FormData = new FormData();
    formdata.append('filekey', fileToUpload, fileToUpload.name);
    console.log(formdata);
    return this.http.post(`${environment.ApiUrl}/upload`, formdata);
  }
}
