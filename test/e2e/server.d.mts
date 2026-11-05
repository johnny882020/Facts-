export interface FixtureServers { port: number; port2: number; close: () => Promise<unknown> }
export function startServers(): Promise<FixtureServers>;
