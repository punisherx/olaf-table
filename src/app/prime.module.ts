import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [],
  imports: [
    CdkTableModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    CdkTableModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: []
})
export class PrimeModule {
}
