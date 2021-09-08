import { Injectable } from '@angular/core';
import { Web3Service } from '../../shared/services/web3.service';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  vyperStorage: any;
  vyperValue: number = 0;
  solidityStorage: any;
  solidityValue: number = 0;

  constructor(private web3Service: Web3Service) {}

  async loadInitialContracts() {
    // setup web3
    await this.web3Service.init();

    const chainID = this.web3Service.chainID;

    const vyperStorage = await this.web3Service.loadContract(
      chainID,
      'VyperStorage'
    );
    const solidityStorage = await this.web3Service.loadContract(
      chainID,
      'SolidityStorage'
    );

    if (!vyperStorage || !solidityStorage) {
      console.error('Missing smart-contract');
      return;
    }

    const vyperValue = await vyperStorage.methods.get().call();
    const solidityValue = await solidityStorage.methods.get().call();

    this.vyperStorage = vyperStorage;
    this.vyperValue = vyperValue;
    this.solidityStorage = solidityStorage;
    this.solidityValue = solidityValue;
  }

  async changeVyper(input: string) {
    const accounts = this.web3Service.accounts;
    const value = parseInt(input);

    if (isNaN(value)) {
      console.error('invalid value');
      return;
    }

    await this.vyperStorage.methods
      .set(value)
      .send({ from: accounts[0] })
      .on('receipt', async () => {
        this.vyperValue = await this.vyperStorage.methods.get().call();
      });
  }

  async changeSolidity(input: string) {
    const accounts = this.web3Service.accounts;
    const value = parseInt(input);
    if (isNaN(value)) {
      console.error('invalid value');
      return;
    }
    await this.solidityStorage.methods
      .set(value)
      .send({ from: accounts[0] })
      .on('receipt', async () => {
        this.solidityValue = await this.solidityStorage.methods.get().call();
      });
  }
}
