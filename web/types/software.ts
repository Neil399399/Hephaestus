import { SVGProps } from "react";

export type Software = SVGProps<SVGSVGElement> & {
  id: number;
  serial: string;
  username: string;
  department: string;
  deviceId: string;
  state: number;
  os: number;
  created_at: string;
  expired_at: string;
};
