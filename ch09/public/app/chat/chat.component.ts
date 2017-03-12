/**
 * Created by dpitic on 12/03/17.
 * Chat component used to implement the client side chat functionality.
 */
import {Component} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
    selector: 'chat',
    templateUrl: 'app/chat/chat.template.html',
    providers: [ChatService]
})
export class ChatComponent {
    messageText: string;
    messages: Array<any>;

    constructor(private _chatService: ChatService) {}

    ngOnInit() {
        this.messages = new Array();

        // chatMessage event listener used to add retrieved messages to the
        // messages array
        this._chatService.on('chatMessage', (msg) => {
            this.messages.push(msg);
        });
    }

    // Send new messages by emitting the chatMessage event to the socket server.
    sendMessage() {
        const message = {
            text: this.messageText,
        };

        this._chatService.emit('chatMessage', message);
        this.messageText = ''
    }

    // Emitted when the controller instance is deconstructed.
    ngOnDestroy() {
        this._chatService.removeListener('chatMessage');
    }
}