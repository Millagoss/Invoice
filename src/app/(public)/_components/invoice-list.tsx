"use client";
import { InvoiceListType } from "@/types/invoice";
import { Badge, Box, Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";
import { useTable } from "react-table";

const InvoiceList = ({
  invoices,
}: {
  invoices: InvoiceListType[] | undefined;
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Invoice Number",
        accessor: (row: any) => row.number,
      },
      {
        Header: "Client Name",
        accessor: (row: any) => row.client.name,
      },
      {
        Header: "Total",
        accessor: (row: any) => row.total.toFixed(2), // Format as currency
      },
      {
        Header: "Due Date",
        accessor: (row: any) => row.dueDate, // Format date
      },
      {
        Header: "Items",
        accessor: (row: any) => {
          return (
            <Box className="overflow-x-scroll">
              {row.items.map((item: { description: string; id: number }) => (
                <Badge variant="outline" className="mr-1" key={item.id}>
                  {item.description}
                </Badge>
              ))}
            </Box>
          );
        },
      },
      {
        Header: "Action",
        accessor: (row: any) => (
          <>
            <Button
              component={Link}
              variant="light"
              href={`/invoices/${row.id}`}
              className="mr-5"
            >
              <IconEdit className="w-5 h-5" />
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => invoices, [invoices]) || [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <table
        {...getTableProps()}
        className="w-full border border-gray-300 table-auto"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  className="px-4 py-2 bg-gray-100 text-left font-medium text-xs"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <td className="px-4 py-2 border border-gray-300">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
