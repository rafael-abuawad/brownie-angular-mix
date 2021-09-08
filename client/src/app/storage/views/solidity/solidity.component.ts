import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-solidity',
  templateUrl: './solidity.component.html',
  styleUrls: ['./solidity.component.scss'],
})
export class SolidityComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup = this.fb.group({
    newValue: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private contractsService: ContractsService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.contractsService.loadInitialContracts();
    this.loading = false;
  }

  async changeSolidity() {
    this.loading = true;
    const newValue = this.form.get('newValue')!.value;
    await this.contractsService.changeSolidity(newValue);
    this.form.reset();
    this.loading = false;
  }

  get solidityValue() {
    return this.contractsService.solidityValue;
  }
}
