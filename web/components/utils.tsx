import {ChipProps} from "@nextui-org/react";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const statusColorMap: Record<string, ChipProps["color"]> = {
  0: "success",
  1: "warning",
  2: "danger",
};

export function partnerStatusParser(num: number) {
  switch (num) {
    case 0:
      return "Actived";
    case 1:
      return "Inactived";
    case 2:
      return "Paused";
    default:
      return "not matched";
  }
}

export function deviceStatusParser(num:number) {
  switch (num) {
    case 0:
      return "Actived";
    case 1:
      return "Inactived";
    case 2:
      return "Scrapped";
    default:
      return "not matched";
  }
}

export function devicesOSParser(num:number){
  switch (num) {
    case 0:
      return "Windows XP";
    case 1:
      return "Windows 7 Home";
    case 2:
      return "Windows 7 Professional";
    case 3:
      return "Windows 8 Home";
    case 4:
      return "Windows 8 Professional";
    case 5:
      return "Windows 10 Home";
    case 6:
      return "Windows 10 Professional";
    case 7:
      return "Windows 11 Home";
    case 8:
      return "Windows 11 Professional";
    case 9:
      return "Windows Server 2003";
    case 10:
      return "Windows Server 2012";
    case 11:
      return "Windows Server 2016";
    case 12:
      return "Windows Server 2019";
    case 13:
      return "Windows Server 2022";
    case 14:
      return "LINUX";
    default:
      return "not matched";
  }
}