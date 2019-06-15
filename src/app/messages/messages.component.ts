import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';
import { trigger, state, style, transition, animate, useAnimation } from '@angular/animations';
import { timer } from 'rxjs';
import { Alert } from '../shared/model/alert';
import { bounceIn, fadeOut } from 'ng-animate';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('bounceIn', [
      transition('hidden => visible', useAnimation(bounceIn))
    ]),
    trigger('openClose', [
      transition('open => closed', useAnimation(fadeOut))
    ]),
    trigger('shrinkOut', [
      state('in', style({
        opacity: '*',
        height: '*', padding: '*', border: '*', margin: '*'
      })),
      state('void', style({
        opacity: 0,
        height: 0, padding: 0, border: 0, margin: 0
      })),
      transition('in => void', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {
  isOpen = true;

  messages: Alert[] = [];

  constructor(
    public messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.messageService.getAlerts().subscribe((alert: Alert) => {
      if (!alert) {
        this.messages = [];
        return;
      }

      alert.visible = false;
      alert.shrink = false;
      this.messages.push(alert);
      timer(1).subscribe(i => {
        this.messages.find(x => x === alert).visible = true;
      });
      timer(5000).subscribe(i => {
        this.messages.find(x => x === alert).visible = false;
      });
      timer(6000).subscribe(i => {
        if (!alert.visible && this.messages) {
          this.messages.find(x => x === alert).shrink = true;
        }
      });
      timer(7000).subscribe(i => {
        this.messages = this.messages.filter(x => x !== alert);
      });
    });
  }

  removeMessage(index: number) {
    this.messageService.remove(index);
    this.messages.splice(index, 1);
  }

}
