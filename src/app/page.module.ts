import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MessagesModule,
        ToastModule],
    exports: [],
    declarations: [
        LoginComponent]
})
export class PageModule {
}
