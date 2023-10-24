// eslint-disable-next-line import/no-unresolved
import { Mac0, Sign1 } from 'cose-kit';
import { JWK } from 'jose';
import IssuerAuth from './IssuerAuth';
import { IssuerSignedDataItem, IssuerSignedItem } from './IssuerSignedItem';

export type ValidityInfo = {
  signed: Date,
  validFrom: Date,
  validUntil: Date,
  expectedUpdate?: Date,
};

export type IssuerNameSpaces = {
  [x: string]: IssuerSignedItem[];
};

export type ValidatedIssuerNameSpaces = {
  [x: string]: {
    [x: string]: unknown;
  };
};

export type IssuerSigned = {
  issuerAuth: IssuerAuth;
  nameSpaces: IssuerNameSpaces;
};

export type DeviceSignedItems = {
  [x: string]: unknown;
};

export type DeviceAuth =
  | { deviceMac: Mac0 } & { deviceSignature?: never }
  | ({ deviceMac?: never } & { deviceSignature: Sign1 });

export type DeviceSigned = {
  deviceAuth: DeviceAuth;
  nameSpaces: Map<string, Map<string, any>>;
};

export type RawIndexedDataItem = IssuerSignedDataItem[];

export type RawNameSpaces = Map<string, RawIndexedDataItem>;

type RawAuthElement = ConstructorParameters<typeof Sign1>;

export type RawIssuerAuth = ConstructorParameters<typeof Sign1>;

export type RawDeviceAuth = Map<'deviceMac' | 'deviceSignature', RawAuthElement>;

// export type MobileDocument = {
//   docType: string;
//   issuerSigned: IssuerSigned;
//   deviceSigned?: DeviceSigned;
// };

// export type MDoc = {
//   documents: MobileDocument[];
//   version: string;
//   status: number;
// };

export type DiagnosticInformation = {
  general: {
    type: string,
    version: string,
    status: number,
    documents: number,
  },
  validityInfo: ValidityInfo,
  attributes: {
    ns: string,
    id: string,
    value: any,
    isValid: boolean,
    matchCertificate?: boolean,
  }[],
  deviceAttributes: {
    ns: string,
    id: string,
    value: any,
  }[],
  issuerCertificate?: {
    subjectName: string;
    notBefore: Date;
    notAfter: Date;
    serialNumber: string;
    thumbprint: string;
    pem: string;
  },
  issuerSignature: {
    alg: string,
    isValid: boolean;
    reasons?: string[];
    digests: {
      [ns: string]: number;
    };
  },
  deviceKey: {
    jwk: JWK;
  },
  deviceSignature: {
    alg: string;
    isValid: boolean;
    reasons?: string[];
  }
  dataIntegrity: {
    disclosedAttributes: string;
    isValid: boolean;
    reasons?: string[];
  }
};
