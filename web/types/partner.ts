import { SVGProps } from "react";

export type Partner = SVGProps<SVGSVGElement> & {
  id: number;
  company: string;
  address: string;
  status: number;
  contact: string;
  phone: string;
  taxId: string;
};
