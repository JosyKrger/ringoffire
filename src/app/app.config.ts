import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-cea17","appId":"1:417070971219:web:72b91d34bfdb2fd405c9a6","storageBucket":"ring-of-fire-cea17.appspot.com","apiKey":"AIzaSyBq6RY5l6JbE8DD6VMQL7GSit8tyUvj96I","authDomain":"ring-of-fire-cea17.firebaseapp.com","messagingSenderId":"417070971219"})), provideFirestore(() => getFirestore())]

};
