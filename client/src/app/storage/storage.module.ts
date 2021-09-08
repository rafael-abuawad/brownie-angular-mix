import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StorageRoutingModule } from './storage-routing.module';
import { VyperComponent } from './views/vyper/vyper.component';
import { SolidityComponent } from './views/solidity/solidity.component';

@NgModule({
  declarations: [VyperComponent, SolidityComponent],
  imports: [CommonModule, ReactiveFormsModule, StorageRoutingModule],
})
export class StorageModule {}
