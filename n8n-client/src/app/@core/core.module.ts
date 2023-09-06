import { NgModule, Optional, SkipSelf } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CookieModule } from 'ngx-cookie';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { N8nCoreInterceptor } from './interceptors/n8n-core.interceptor';

import { userReducer } from '../ngrx/user/user.reducer';
import { UserEffects } from '../ngrx/user/user.effects';
import { projectReducer } from '../@features/dashboard/pages/projects/ngrx/project.reducer';
import { ProjectEffects } from '../@features/dashboard/pages/projects/ngrx/project.effects';

const CORE_MODULES = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...CORE_MODULES,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(
      {
        user: userReducer,
        project: projectReducer,
      },
      {}
    ),
    EffectsModule.forRoot([UserEffects, ProjectEffects]),
    CookieModule.withOptions(),
  ],
  exports: [...CORE_MODULES],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: N8nCoreInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
