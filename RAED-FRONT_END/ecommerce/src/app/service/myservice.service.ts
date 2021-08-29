import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private _http:HttpClient) { }

  submitRegister(body:any){
    return   this._http.post('http://localhost:2000/api/admin/signup', body,{
      observe:'body'
    })
  }
  login(body:any){
    return   this._http.post('http://localhost:2000/api/admin/signin', body,{
      observe:'body'
    })
  }
}
