"use client";
import { InvoiceListType } from "@/types/invoice";
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
              <tr {...row.getRowProps()} className="hover:bg-gray-500">
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
