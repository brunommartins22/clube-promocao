import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class loading {

    isVisible: boolean = false;


    public getIsVisible() {
        this.isVisible = true;
    }

    public getNotIsVisible() {
        this.isVisible = false;
    }


}