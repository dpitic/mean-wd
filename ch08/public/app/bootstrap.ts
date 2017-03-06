/**
 * Created by dpitic on 26/02/17.
 * Used to bootstrap the application module. It uses the browser platform module
 * to bootstrap the application module for browsers.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);