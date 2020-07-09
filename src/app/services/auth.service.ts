import { Injectable } from '@angular/core';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { Is_Authenticated, Is_Not_Authenticated } from '../actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../models/auth.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const Backend_URL = environment.BACKEND_URL + "user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:string;
  private tokenTimer:any;
  constructor(public store:Store<fromRoot.State>,private http:HttpClient,private router:Router) { }

  get_token(){
    return this.token;
  }
  is_auth(){
    return this.store.select(fromRoot.isAuthenticated)
  }
  signup(authData:AuthModel){
    this.http.post(Backend_URL + 'signup',authData).subscribe((_)=>{
      this.store.dispatch(new Is_Authenticated())
      this.router.navigate(['/'])
    })
  }
  login(authData:AuthModel){
    this.http.post<{token:string,expiresIn:number}>(Backend_URL+'login',authData).subscribe((response)=>{
      this.store.dispatch(new Is_Authenticated())
      this.token = response.token;
      this.autoLogut(response.expiresIn)
      this.setLocalStorage(response.token,response.expiresIn)
      this.router.navigate(['/posts'])
    })
  }
  logout(){
    this.token = null;
    this.store.dispatch(new Is_Not_Authenticated())
    clearTimeout(this.tokenTimer)
    this.clearLocalStorage()
    this.router.navigate(['/'])
  }
  autoLogin(){
    const ls = this.getLocalStorage()
    const now = new Date()
    if(!ls){
      return;
    }
    const remainingTime = ls.expirationDate.getTime() - now.getTime()
    if (remainingTime > 0){
      this.autoLogut(remainingTime / 1000) //update timer after refresh
      this.token = localStorage.getItem('token')
      this.store.dispatch(new Is_Authenticated())
    }
  }
  autoLogut(duration:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout()
    },duration * 1000) //ms
  }
  setLocalStorage(token:string,expiresIn:number){
    localStorage.setItem('token',token);
    const now = new Date()
    const expirationDate:Date = new Date(now.getTime() + (expiresIn * 1000))
    localStorage.setItem('expirationDate',expirationDate.toISOString()) //3shn lma nrg3ha date tany tb2a sahla
  }
  clearLocalStorage(){
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
  }
  getLocalStorage(){
    const token = localStorage.getItem('token')
    const expirationDate =new Date (localStorage.getItem('expirationDate'))
    if (!token || !expirationDate) return;
    return {
      token,
      expirationDate
    }
  }

}
