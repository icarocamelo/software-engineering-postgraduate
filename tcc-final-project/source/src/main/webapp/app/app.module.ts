import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SaudeplusplusSharedModule } from 'app/shared/shared.module';
import { SaudeplusplusCoreModule } from 'app/core/core.module';
import { SaudeplusplusAppRoutingModule } from './app-routing.module';
import { SaudeplusplusHomeModule } from './home/home.module';
import { SaudeplusplusEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SaudeplusplusSharedModule,
    SaudeplusplusCoreModule,
    SaudeplusplusHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SaudeplusplusEntityModule,
    SaudeplusplusAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class SaudeplusplusAppModule {}
