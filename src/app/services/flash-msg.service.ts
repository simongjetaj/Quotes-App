import { Injectable } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FlashMsgService {

  constructor(public flashMessagesService: FlashMessagesService, public router: Router) { }

  displayFlashMessage(message: string, cssClass: string, timeout: number, navigateTo: string) {
    this.flashMessagesService.show(message, { cssClass, timeout });
    this.router.navigate([navigateTo]);
  }
}
