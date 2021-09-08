import { Injectable } from '@angular/core';
import { getWeb3 } from '../utils/get-web3.util';
import { getEthereum } from '../utils/get-ethereum.util';
import _map from '../../../artifacts/deployments/map.json';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private _web3: any;
  private _accounts: any;
  private _chainid: number | string = 0;

  constructor() {}

  // You *need* to call this function
  async init() {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Try and enable accounts (connect metamask)
    try {
      const ethereum = await getEthereum();
      ethereum.enable();
    } catch (e) {
      console.log(`Could not enable accounts. Interaction with contracts not available.
            Use a modern browser with a Web3 plugin to fix this issue.`);
      console.log(e);
    }

    // Use web3 to get the user's accounts
    const accounts = await web3.eth.getAccounts();

    // Get the current chain id
    const chainid = parseInt(await web3.eth.getChainId());

    this._web3 = web3;
    this._accounts = accounts;
    this._chainid = chainid;

    return { web3, accounts, chainid };
  }

  async loadContract(chain: string | number, contractName: string) {
    const web3 = this._web3;
    const map: any = _map;

    // Get the address of the most recent deployment from the deployment map
    let address;
    try {
      address = map[chain][contractName][0];
    } catch (e) {
      console.log(
        `Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`
      );
      return undefined;
    }

    // Load the artifact with the specified address
    let contractArtifact;
    try {
      contractArtifact = await import(
        `../../../artifacts/deployments/${chain}/${address}.json`
      );
    } catch (e) {
      console.log(
        `Failed to load contract artifact "../../../artifacts/deployments/${chain}/${address}.json"`
      );
      return undefined;
    }

    return new web3.eth.Contract(contractArtifact.abi, address);
  }

  get web3(): any {
    return this._web3;
  }

  get accounts(): any {
    return this._accounts;
  }

  get chainID(): number | string {
    if (this._chainid === 42) {
      return 42;
    } else if (this._chainid === 1337) {
      return 'dev';
    }
    return 0;
  }
}
