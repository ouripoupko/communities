import { IContract, IMethod } from "interfaces";

export function listenAgent(
  server: string,
  agent: string,
  listener: (data: string) => void
) {
  const eventSource = new EventSource(
    `${server}/stream?agent=${agent}&contract=`
  );

  eventSource.onmessage = (event) => {
    // console.log("event source:", event);
    listener(event.data);
  };

  return () => {
    eventSource.close(); // Clean up on unmount
  };
}

export async function getAgentContracts(
  server: string,
  agent: string
): Promise<IContract[]> {
  try {
    const reply = await fetch(
      `${server}/ibc/app/${agent}?action=get_contracts`,
      {
        method: "GET",
      }
    );
    return await reply.json();
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return [];
  }
}

export async function readAgentContract(
  server: string,
  agent: string,
  contract: string,
  method: IMethod
) {
  try {
    const reply = await fetch(
      `${server}/ibc/app/${agent}/${contract}/${method.name}?action=contract_read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(method),
      }
    );
    return await reply.json();
  } catch (error) {
    console.error("Error reading contract:", error);
    return undefined;
  }
}

export async function writeAgentContract(
  server: string,
  agent: string,
  contract: string,
  method: IMethod
) {
  try {
    const reply = await fetch(
      `${server}/ibc/app/${agent}/${contract}/${method.name}?action=contract_write`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(method),
      }
    );
    return await reply.json();
  } catch (error) {
    console.error("Error writing to contract:", error);
    return undefined;
  }
}
