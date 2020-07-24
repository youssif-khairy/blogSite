import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core"


@Injectable({
    providedIn:'root'
})
export class LanguageService{

    language:string = 'en';
    constructor(private translate:TranslateService){
        translate.addLangs(['en','ar']);
        translate.setDefaultLang('en')
    }
    toogleLanguage(){
        this.language = this.language == 'en' ? 'ar' : 'en';
        this.translate.use(this.language)
    }

}