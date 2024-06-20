import { SVGProps } from "react";

export type Device = SVGProps<SVGSVGElement> & {
  id: number;
  username: string;
  department: string;
  deviceId: string;
  state: number;
  os: number;
  lanIP: string;
  lanMAC: string;
  wirelessIP: string;
  wirelessMAC: string;
  create_at: string;
};