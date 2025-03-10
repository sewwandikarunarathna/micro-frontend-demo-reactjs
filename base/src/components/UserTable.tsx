import React, { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    zipcode: string;
    city: string;
    street: string;
    suite: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const columnNamesArray = [
  "id",
  "name",
  "username",
  "email",
  "phone",
  "website",
  "address",
  "company",
];
const subColumnArray = ["zipcode", "city", "street", "suite", "name", "catchPhrase", "bs"];
const columnNames = {
  id: "ID",
  name: "Full Name",
  username: "Username",
  email: "Email Address",
  phone: "Phone Number",
  website: "Website Name",
  address: {
    zipcode: "Zip Code",
    city: "City Name",
    street: "Street Name",
    suite: "Suite Name",
  },
  company: {
    name: "Company Name",
    catchPhrase: "Company Phrase",
    bs: "Company Title"
  }
} as const;

type UserApiResponse = {
    data: Array<User>;
    meta: {
      totalRowCount: number;
    };
};

const UserTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () =>
      data?.length
        ? Object.keys(data[0])
            .filter((columnId) => columnNamesArray.includes(columnId))
            .flatMap((columnId: any) => {
              if (typeof columnNames[columnId as keyof User] === "object") {
                return Object.keys(columnNames[columnId as keyof User])
                  .filter((subColumnId) => subColumnArray.includes(subColumnId))
                  .map((subColumnId) => ({
                    header: (columnNames[columnId as keyof User] as any)[
                      subColumnId as keyof (typeof columnNames)[keyof typeof columnNames]
                    ],
                    accessorKey: `${columnId}.${subColumnId}`,
                    id: `${columnId}.${subColumnId}`,
                  }));
              }
              return {
                header: columnNames[columnId as keyof User],
                accessorKey: columnId,
                id: columnId,
              };
            })
        : [],
    [data]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL("https://jsonplaceholder.typicode.com/users", location.origin);
      // url.searchParams.set(
      //   "start",
      //   `${pagination.pageIndex * pagination.pageSize}`
      // );
      // url.searchParams.set("size", `${pagination.pageSize}`);
      // url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      // url.searchParams.set("globalFilter", globalFilter ?? "");
      // url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      // try {
      //   const response = await fetch(url.href);
      //   const jsonData = (await response.json());
      const requestBody = {
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: columnFilters ?? [],
        globalFilter: globalFilter ?? "",
        sorting: sorting ?? [],
      };
  
      try {
        const response = await fetch(url.href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const jsonData = await response.json();
        //
        console.log(response.body);
        console.log(jsonData);
        setData(jsonData);
        setRowCount(jsonData.length);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters, //re-fetch when column filters change
    globalFilter, //re-fetch when global filter changes
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    sorting, //re-fetch when sorting changes
  ]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    getRowId: (row) => row.username,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default UserTable;
