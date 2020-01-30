import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Api from '../api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  APIUrl=Api.apiURL;
  

  constructor(private http:HttpClient) { }

  ListarConsultores(){    
     return this.http.get(this.APIUrl+"user");
  }

  ListarRelatorio(obj){
    const headers = new HttpHeaders({'Content-Type':'application/json'});           
    return this.http.post(this.APIUrl + 'relatorio',obj, {headers:headers});   
  }

  Total(obj){
    const headers = new HttpHeaders({'Content-Type':'application/json'});           
    return this.http.post(this.APIUrl + 'total',obj, {headers:headers});   
  }


  Grafico(obj){
    const headers = new HttpHeaders({'Content-Type':'application/json'});           
    return this.http.post(this.APIUrl + 'grafico',obj, {headers:headers});   
  }

  Pizza(obj){
    const headers = new HttpHeaders({'Content-Type':'application/json'});           
    return this.http.post(this.APIUrl + 'pizza',obj, {headers:headers});   
  }

  Series(obj){
    const headers = new HttpHeaders({'Content-Type':'application/json'});           
    return this.http.post(this.APIUrl + 'series',obj, {headers:headers});   
  }
  


}
