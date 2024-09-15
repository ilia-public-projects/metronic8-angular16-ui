import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { SharedApplicationModule } from '../../shared/shared-application.module';

@NgModule({
  declarations: [
    KeeniconComponent
  ],
  imports: [
    SharedApplicationModule,
  ],
  exports: [
    KeeniconComponent
  ]
})
export class SharedModule {
}
