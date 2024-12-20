export interface IContract {
  id: string;
  name: string;
  contract: string;
  code: string;
  protocol: string;
  default_app: string;
  pid: string;
  address: string;

  group: string[];
  threshold: number;
  profile: string;

  constructor: any;
}

export interface IMethod {
  name: string;
  arguments: string[];
  values: any;
}

export interface IPartner {
  address: string;
  agent: string;
  profile: string;
}

export interface IInvite {
  server: string;
  agent: string;
  contract: string;
  name: string;
}

export interface IGlokiCollection {
    profile: string | undefined;
    communities: string[];
    deliberations: string[];
}

export interface IProfile {
  firstName: string;
  lastName: string;
  userPhoto: string;
  userBio: string;
}
