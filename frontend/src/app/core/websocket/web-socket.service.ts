import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // constructor(private socket: Socket) {
  //   this.socket.on('connect', () => {
  //     console.log('WebSocket connected');
  //   });
  //
  //   this.socket.on('disconnect', () => {
  //     console.log('WebSocket disconnected');
  //   });
  // }
  //
  // sendMessage(message: string) {
  //   this.socket.emit('message', message);
  // }
  //
  // getMessages() {
  //   return this.socket.fromEvent<string>('message');
  // }
  //
  // getControlSettingsUpdates(): Observable<any> {
  //   return this.socket.fromEvent<any>('control-settings-update'); // Assuming the server emits this event
  // }
}
