/**
 * Created by dpitic on 12/03/17.
 * Chat service is used to obfuscate component communication with the Socket.io
 * client library.
 */
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class ChatService {
    private socket: any;

    constructor(private _router: Router,
                private _authenticationService: AuthenticationService) {
        if (this._authenticationService.isLoggedIn()) {
            // User is logged in; set socket property by calling io() method of
            // Socket.io
            this.socket = io();
        } else {
            // User not logged in; redirect request back to home page using
            // Router
            this._router.navigate(['Home']);
        }
    }

    /*
     * Wrap the socket emit(), on() and removeListener() methods with
     * compatible service methods.
     */

    on(eventName, data) {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    };

    emit(eventName, data) {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    };

    removeListener(eventName) {
        if (this.socket) {
            this.socket.removeListener(eventName);
        }
    };
}