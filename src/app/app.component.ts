import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService,private langService:LanguageService){}
  ngOnInit(){
    this.authService.autoLogin()
  }
}
