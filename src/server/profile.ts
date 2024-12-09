import { IMethod, IProfile } from "interfaces";
import { readAgentContract, writeAgentContract } from "./agent";

export async function fetchProfileFromServer(
  server: string,
  agent: string,
  contract: string
) {
  let method = {
    name: "get_profile",
    values: {},
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

export async function writeProfileToServer(
  server: string,
  agent: string,
  contract: string,
  profile: IProfile
) {
  let method = { name: "set_values", values: { items: profile } } as IMethod;
  return await writeAgentContract(server, agent, contract, method);
}

// const PROFILE_FILE_NAME = 'profile.py'

// function strNotEmpty(str?: string): boolean {
//   return str !== undefined && str !== null && str.trim() !== '';
// }

// export interface Profile {
//   first_name: string;
//   last_name: string;
//   image_url: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {

//   contract?: string;
//   profile: Profile = {} as Profile;
//   others: {[key: string]: Profile} = {};

//   constructor(
//     private agentService: AgentService,
//     private commonService: CommonService,
//     private listenService: ListenService
//   ) { }

//   clear() {
//     this.contract = undefined;
//     this.profile = {} as Profile;
//   }

//   deployProfileContract() {
//     this.commonService.deployContract(PROFILE_CONTRACT_NAME, PROFILE_FILE_NAME, "", {}).subscribe(reply => {
//       this.contract = reply;
//       this.listenService.register(this.contract, 'contract_write', _ => this.readProfile());
//     });
//   }

//   isProfileFull() {
//     return (
//       strNotEmpty(this.profile?.first_name) &&
//       strNotEmpty(this.profile?.last_name) &&
//       strNotEmpty(this.profile?.image_url) );
//   }

//   readOthers (partners: Partner[]) {
//     for (let partner of partners) {
//       this.others[partner.agent] = {} as Profile;
//       let method = {} as Method;
//       method.name = 'get_profile';
//       method.values = {};
//       this.agentService.readRemote(partner.address, partner.agent, partner.profile, method).subscribe((profile => {
//         if(profile) {
//           Object.assign(this.others[partner.agent], profile);
//         }
//       }));
//     }
//   }
// }
