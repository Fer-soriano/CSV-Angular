import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateCobroService {
  backUrl: 'http://localhost:8090/api/1.0/';
  private readonly urlEndPoint: string = environment.backUrl;

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})};
  constructor(private readonly httpClient: HttpClient) { }
 
  actualizarCobros(COBRADO: String, ADICIONAL2: String):Observable<any>{
    return this.httpClient.put<any>(this.urlEndPoint + 'adicional/actualizarCobros/'+'?COBRADO='+COBRADO+'&ADICIONAL2='+ADICIONAL2, this.httpOptions);
  }
  
}
