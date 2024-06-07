export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
