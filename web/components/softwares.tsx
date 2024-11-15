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
import { softwareColumns, deviceStatusOptions } from "../config/data";
import {
  capitalize,
  deviceStatusParser,
  devicesOSParser,
  statusColorMap,
} from "./utils";
import { Software } from "@/types/software";

interface SoftwaresProps {
  data: Software[];
}

export default function SoftwaresTable(props: SoftwaresProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = React.useMemo(() => {
    let filtersDevices = [...props.data];

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
  }, [props.data, filterValue, statusFilter]);

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
            Total {props.data.length} devices
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
    props.data.length,
    hasSearchFilter,
  ]);

  const renderCell = React.useCallback(
    (software: Software, columnKey: React.Key) => {
      switch (columnKey) {
        case "serial":
          return <>{software.serial}</>;
        case "username":
          return <>{software.username}</>;
        case "department":
          return <>{software.department}</>;
        case "deviceId":
          return <>{software.deviceId}</>;
        case "os":
          return <>{devicesOSParser(software.os)}</>;
        case "state":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[software.state]}
              size="sm"
              variant="dot"
            >
              {deviceStatusParser(software.state)}
            </Chip>
          );
        case "created_at":
          return <>{software.created_at}</>;
        case "expired_at":
          return <>{software.expired_at}</>;
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
      <TableHeader columns={softwareColumns}>
        {(column) => <TableColumn key={column.uid}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No found"} items={props.data}>
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
