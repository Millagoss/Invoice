"use client";
import { exportInvoices } from "@/lib/excel";
import { InvoiceListType } from "@/types/invoice";
import { Badge, Box, Button, Flex, Text } from "@mantine/core";
import { IconEdit, IconFileSpreadsheet } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";
import { useTable } from "react-table";

const InvoiceList = ({
  invoices,
  title,
}: {
  invoices: InvoiceListType[] | undefined;
  title: string;
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

  const handleExport = () => {
    exportInvoices(invoices);
  };
  const data = useMemo(() => invoices, [invoices]) || [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <Flex className="flex justify-between pr-5 items-center">
        <Text className="text-xl px-4 font-bold">{title}</Text>{" "}
        <Box
          onClick={handleExport}
          className="p-1 cursor-pointer flex items-center border border-gray-200 shadow-md text-primary-text rounded-md"
        >
          <Text className="font-bold"> Export</Text>{" "}
          <IconFileSpreadsheet size="30px" />
        </Box>
      </Flex>
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
    </>
  );
};

export default InvoiceList;
