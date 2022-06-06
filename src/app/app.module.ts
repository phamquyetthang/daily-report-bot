import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './screens/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './services/index.module';
import { ReportComponent } from './screens/report/report.component';
import { AuthGuard } from './screens/auth/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './helpers/auth.Interceptor';
import { ErrorInterceptor } from './helpers/error.Interceptor';
import { ReportFormComponent } from './components/report-form/report-form.component';
@NgModule({
  declarations: [AppComponent, AuthComponent, ReportComponent, HeaderComponent, ReportFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
