import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessagesService
  ) { }

  ngOnInit() {
  }

  removeMessage(index: number) {
    this.messageService.remove(index);
  }

}
