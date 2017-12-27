import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadService{
  public progressbar;

  constructor(private _http:Http){}

  makeFileRequest(token, url:string, params: Array<string>, files: Array<File>){
    return new Promise((resolve, reject) => {
      var formData : any = new FormData();
      var xhr = new XMLHttpRequest();

      var name_file_input = params[0];
      for(var i=0; i<files.length; i++){
        formData.append(name_file_input, files[i], files[i].name);
      }
      formData.append("authorization", token);

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.readyState == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.upload.addEventListener("progress", function(event:any){
        var progresbar = document.getElementById('upload-progress-bar');
        var percent = (event.load / event.total) * 100;
        let prc = Math.round(percent).toString();
        progresbar.setAttribute("value", prc);
        progresbar.style.width = prc + "%";
        document.getElementById('status').innerHTML = Math.round(percent) + "subido... por favor espera a que termine";
      }, false);
    });
  }
}