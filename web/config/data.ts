import { Device } from "@/types/device";
import { Partner } from "@/types/partner";
import { Software } from "@/types/software";

const columns = [
  { label: "id", uid: "id" },
  { label: "company", uid: "company" },
  { label: "taxId", uid: "taxId" },
  { label: "contact", uid: "contact" },
  { label: "status", uid: "status" },
];

const deviceColumns = [
  { label: "id", uid: "id" },
  { label: "username", uid: "username" },
  { label: "department", uid: "department" },
  { label: "deviceId", uid: "deviceId" },
  { label: "os", uid: "os" },
  { label: "lan_ip", uid: "lanIP" },
  { label: "wireless_ip", uid: "wirelessIP" },
  { label: "creatde_at", uid: "created_at" },
  { label: "state", uid: "state" },
];

const softwareColumns = [
  { label: "serial", uid: "serial" },
  { label: "username", uid: "username" },
  { label: "department", uid: "department" },
  { label: "deviceId", uid: "deviceId" },
  { label: "os", uid: "os" },
  { label: "created_at", uid: "created_at" },
  { label: "expired_at", uid: "expired_at" },
  { label: "state", uid: "state" },
];
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const deviceStatusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactived", uid: "inactived" },
  { name: "Scrapped", uid: "scrapped" },
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

const devices = <Device[]>[
  {
    id: 1,
    username: "alice",
    department: "Accounting",
    deviceId: "AC01",
    state: 0,
    os: 3,
    lanIP: "192.168.0.100",
    lanMAC: "A0:B1:C2:D3:E4:F5",
    wirelessIP: "192.168.100.100",
    wirelessMAC: "A0:B1:C2:D3:E4:F5",
    created_at: "20240101",
  },
  {
    id: 2,
    username: "bob",
    department: "R&B",
    deviceId: "RB02",
    state: 2,
    os: 12,
    lanIP: "192.168.0.2",
    lanMAC: "A0:B1:C2:D3:E4:F5",
    wirelessIP: "192.168.100.5",
    wirelessMAC: "A0:B1:C2:D3:E4:F5",
    created_at: "20200101",
  },
];

const softwares = <Software[]>[
  {
    id: 1,
    serial: "XKMQ-0013-6245-5316-7453",
    username: "alice",
    department: "Accounting",
    deviceId: "AC01",
    state: 0,
    os: 3,
    created_at: "20240101",
    expired_at: "20240130",
  },
  {
    id: 2,
    serial: "XKMQ-0013-6245-5316-7453",
    username: "bob",
    department: "R&B",
    deviceId: "RB02",
    state: 2,
    os: 12,
    created_at: "20200101",
    expired_at: "20240130",
  },
];

export {
  columns,
  partners,
  statusOptions,
  deviceColumns,
  devices,
  softwares,
  softwareColumns,
  deviceStatusOptions,
};
