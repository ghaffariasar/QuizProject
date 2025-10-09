// app/app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Providers (services, api, etc.)
import { QuizService } from './services/quiz.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    QuizService,

  ]
};



