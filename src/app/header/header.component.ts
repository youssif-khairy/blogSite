import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  is_auth:boolean = false;
  constructor(private store:Store<fromRoot.State>,private authService:AuthService) { }

  ngOnInit(): void {
    this.store.select(fromRoot.isAuthenticated).subscribe((value)=>{
      this.is_auth = value
    })
  }

  onLogout(){
    this.authService.logout()
  }
}
