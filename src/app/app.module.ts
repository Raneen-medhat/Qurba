import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// App services
import { GetLocationService} from './get-location.service'
import { QueryService} from './query.service';
import { LoginGuestComponent } from './login-guest/login-guest.component';
import { SearchPipePipe } from './search-pipe.pipe'
@NgModule({
  declarations: [
    AppComponent,
    LoginGuestComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4RsL_pyLLvm2IpZwLuXSTOfXCEG6A3-g'
    }),
    Ng2SearchPipeModule
  ],
  providers: [GetLocationService,QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
