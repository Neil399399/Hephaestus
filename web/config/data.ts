import { Partner } from "@/types/partner";

const columns = [
  { label: "id", uid: "id" },
  { label: "company", uid: "company" },
  { label: "taxId", uid: "taxId" },
  { label: "contact", uid: "contact" },
  { label: "status", uid: "status" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const partners = <Partner[]>[
  {
    id: 1,
    company: "立安資訊有限公司",
    address: "新北市三重區三和路四段218巷15號1F",
    status: 1,
    contact: "Neil",
    taxId: "80425922",
    phone: "2286-1148",
  },
];

export { columns, partners, statusOptions };
