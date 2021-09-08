import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VyperComponent } from './views/vyper/vyper.component';
import { SolidityComponent } from './views/solidity/solidity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/solidity-storage' },
  { path: 'solidity-storage', component: SolidityComponent },
  { path: 'vyper-storage', component: VyperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StorageRoutingModule {}
