"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
} from "@nextui-org/react";
import { PlusIcon } from "./icons/plusIcon";
import { ChevronDownIcon } from "./icons/chevronDownIcon";
import { SearchIcon } from "./icons/searchIcon";
import { deviceColumns, devices, deviceStatusOptions } from "../config/data";
import { capitalize, deviceStatusParser, devicesOSParser, statusColorMap } from "./utils";
import { Device } from "@/types/device";

export default function DevicesTable() {
  const [filterValue, setFilterValue] = React.useState("");

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = React.useMemo(() => {
    let filtersDevices = [...devices];

    //search
    if (hasSearchFilter) {
        filtersDevices = filtersDevices.filter((device) =>
            device.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== deviceStatusOptions.length
    ) {
        filtersDevices = filtersDevices.filter((device) =>
        Array.from(statusFilter).includes(device.state)
      );
    }

    return filtersDevices;
  }, [devices, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

 
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {deviceStatusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {devices.length} devices
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    devices.length,
    hasSearchFilter,
  ]);

  const renderCell = React.useCallback(
    (device: Device, columnKey: React.Key) => {
      switch (columnKey) {
        case "id":
          return <>{device.id}</>;
        case "username":
          return <>{device.username}</>;
        case "department":
          return <>{device.department}</>;
        case "deviceId":
          return <>{device.deviceId}</>;
        case "os":
          return <>{devicesOSParser(device.os)}</>
        case "state":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[device.state]}
              size="sm"
              variant="dot"
            >
              {deviceStatusParser(device.state)}
            </Chip>
          );
        case "lanIP":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">
                  {device.lanIP}
                </p>
                <p className="text-bold text-tiny capitalize text-default-500">
                  {device.lanMAC}
                </p>
              </div>
          );
        case "wirelessIP":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">
                  {device.wirelessIP}
                </p>
                <p className="text-bold text-tiny capitalize text-default-500">
                  {device.wirelessMAC}
                </p>
              </div>
          );
        case "create_at":
          return <>{device.create_at}</>;
        default:
          return;
      }
    },
    []
  );

  return (
    <Table
      isHeaderSticky
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
      onRowAction={(key) => console.log(`Opening item ${key}...`)}
    >
      <TableHeader columns={deviceColumns}>
        {(column) => <TableColumn key={column.uid}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No found"} items={devices}>
      {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
