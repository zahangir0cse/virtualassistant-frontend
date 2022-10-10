import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {CookieModule} from 'ngx-cookie';
import {ServiceModule} from 'src/services/service.module';
import * as $ from 'jquery';
import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';            // @agm/core
import {AgmDirectionModule} from 'agm-direction';   // agm-direction
import {AuthGuardService} from '../services/auth-guard.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from '../home/home.module';
// routes
export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        Daterangepicker,
        HttpModule,
        ServiceModule,
        Ng2ImgMaxModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        DataTablesModule,
        RouterModule.forRoot(ROUTES),
        CookieModule.forRoot(),
        AgmCoreModule.forRoot({ // @agm/core
            apiKey: 'AIzaSyBjw1URbHitZiUet4lXzrj40qr0wcGvcB0',
        }),
        AgmDirectionModule,
        HomeModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
