import {
    createClient,
    IClient,
    SignatureProvider,
    newSignatureProvider,
  } from "postchain-client";
  import { UUID } from "@ai16z/eliza";

  export const clientUrl = "http://localhost:7740";
  export const blockchainIid = 0;
  export const signatureProvider: SignatureProvider = newSignatureProvider({
    privKey: "01010101010101010101010101010101010101010101010101010101010101012",
  });


interface ChromiaDBConfig {
    clientUrl: string;
    blockchainIid?: number;
    blockchainRid?: string;
    signatureProvider: SignatureProvider;
  }

  export class ChromiaDB {
    clientUrl: string | string[];
    blockchainIid?: number;
    blockchainRid?: string;
    client: IClient;
    signatureProvider: SignatureProvider;

    constructor({
      clientUrl,
      blockchainRid,
      blockchainIid,
      signatureProvider,
    }: ChromiaDBConfig) {
      this.clientUrl = clientUrl;
      this.blockchainRid = blockchainRid;
      this.blockchainIid = blockchainIid;
      this.signatureProvider = signatureProvider;
      this.client = {} as IClient;
    }

    async init() {
      if (this.blockchainRid !== undefined) {
        this.client = await createClient({
          nodeUrlPool: this.clientUrl,
          blockchainRid: this.blockchainRid,
        });
      } else if (this.blockchainIid !== undefined) {
        this.client = await createClient({
          nodeUrlPool: this.clientUrl,
          blockchainIid: this.blockchainIid,
        });
      } else {
        throw new Error("No blockchain identifier provided");
      }
    }

    async createSimpleEntity(id: UUID, logs: string) {
        return this.client.query({
            name: "create_simple_entity",
            args: {
                id: id,
                logs: logs,
            },
        });
    }





}


