"use client";
import React from "react";
import SoftwaresTable from "@/components/softwares";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { partners, softwares } from "../../config/data";
import { Software } from "@/types/software";

// TODO: fetch all partner first, then set device data.
export default function SoftwaresPage() {
  const [selectedPartnerId, setPartnerId] = React.useState(0);
  const [softwaresData, setSoftwaresData] = React.useState<Software[]>([]);

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
      if (softwares) {
        setSoftwaresData(softwares);
      }
    },
    [softwaresData]
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
      <SoftwaresTable data={softwaresData} />
    </div>
  );
}
