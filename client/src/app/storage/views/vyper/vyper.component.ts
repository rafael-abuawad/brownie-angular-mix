import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-vyper',
  templateUrl: './vyper.component.html',
  styleUrls: ['./vyper.component.scss'],
})
export class VyperComponent implements OnInit {
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

  async changeVyper() {
    this.loading = true;
    const newValue = this.form.get('newValue')!.value;
    await this.contractsService.changeVyper(newValue);
    this.form.reset();
    this.loading = false;
  }

  get vyperValue() {
    return this.contractsService.vyperValue;
  }
}
