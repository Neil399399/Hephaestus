import { title } from "@/components/primitives";
import PartnerTable from "@/components/partner-table";

export default function PartnersPage() {
  return (
    <div>
      <h1 className={title()}>Partners</h1>
      <PartnerTable />
    </div>
  );
}
