"use client";
import React from "react";
import DevicesTable from "@/components/devices";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { partners, devices } from "../../config/data";
import { Device } from "../../types/device";

// TODO: fetch all partner first, then set device data.
export default function DevicesPage() {
  const [selectedPartnerId, setPartnerId] = React.useState(0);
  const [devicesData, setDevicesData] = React.useState<Device[]>([]);

  const onSelectChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("select", e.target.value);
      setPartnerId(Number(e.target.value));
    },
    [selectedPartnerId]
  );

  const onSearchChange = React.useCallback(
    (partnerId: number) => {
      console.log("search", partnerId);
      if (devices) {
        setDevicesData(devices);
      }
    },
    [devicesData]
  );

  return (
    <div>
      <div className="relative flex justify-end items-center gap-2">
        <Select label="Select a parter" onChange={onSelectChange}>
          {partners.map((partner) => (
            <SelectItem key={partner.id}>{partner.company}</SelectItem>
          ))}
        </Select>
        <Button
          color="primary"
          size="lg"
          onClick={() => onSearchChange(selectedPartnerId)}
        >
          Search
        </Button>
      </div>
      <br></br>
      <DevicesTable data={devicesData} />
    </div>
  );
}
