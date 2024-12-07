import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    NumberOnlyDirective,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class SharedModule { }
