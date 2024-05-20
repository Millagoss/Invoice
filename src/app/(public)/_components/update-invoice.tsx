"use client";
import { useState } from "react";

import { notify } from "@/components/notification/notification";
import { exportInvoiceToPDF } from "@/lib/pdf";
import { useAuth } from "@/providers/context";
import { InvoiceData, InvoiceListType } from "@/types/invoice";
import {
  Box,
  Button,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Loader,
  NumberInput,
  Paper,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  addItem,
  deleteInvoice,
  deleteItem,
  updateInvoice,
} from "../invoices/_action/invoice.action";

interface Props {
  clients: { id: number; name: string; email: string }[];
  invoice: InvoiceListType;
}

interface InvoiceItems {
  id: number;
  description: string;
  price: number;
}

const UpdateInvoice = ({ invoice, clients }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/auth/sign-in");
  }
  const { client, items, total, dueDate, number, id } = invoice;

  const [description, setDescription] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>(number || "");
  const [price, setPrice] = useState<string | number>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItems[]>(items || []);

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    client: JSON.stringify(client?.id),
    total: total || 0,
    dueDate: new Date(dueDate || "") || null,
    number,
  });
  const handleExport = () => {
    exportInvoiceToPDF(invoice);
  };

  const handleSubmit = async () => {
    if (!invoiceNumber || !invoiceData.client) {
      return notify("Error", "Please fill in");
    }
    setIsAdding(true);
    const d = {
      id,
      ...invoiceData,
      number: invoiceNumber,
      createdBy: user?.id,
    };
    const { data, error } = await updateInvoice(d);
    if (data) notify("Success", "Invoice Updated Successfully");
    else if (error) {
      notify("Error", "Something went wrong");
      console.log(error);
    }
    setIsAdding(false);
  };

  const handleDeleteInvoice = async () => {
    setIsAdding(true);
    const { data } = await deleteInvoice(id);
    if (data) {
      notify("Success", "Invoice Deleted Successfully");
      router.push("/invoices");
    } else notify("Error", "Something went wrong");
    setIsAdding(false);
  };

  const handleAddItems = async () => {
    setIsAdding(true);
    const { data } = await addItem({
      invoiceId: id,
      item: { description, price },
    });
    if (data) {
      setInvoiceItems((p) => [
        ...p,
        { id: data?.id, description: data?.description, price: data?.price },
      ]);
      return notify("Success", "Item Added Successfully");
    } else {
      notify("Error", "Something went wrong");
    }
    setIsAdding(false);
  };

  const handleRemoveItem = async (id: number) => {
    setIsAdding(true);
    const { data } = await deleteItem(id);
    if (data) {
      notify("Success", "Item Deleted Successfully");
      setInvoiceItems((p) => p.filter((item) => item.id !== id));
    } else {
      notify("Error", "Something went wrong");
    }
    setIsAdding(false);
  };

  const options = clients.map((item) => (
    <Combobox.Option value={JSON.stringify(item.id)} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Paper className="lg:container w-full p-1 mx-auto space-y-5 lg:px-6 py-8 ">
      <h1 className="text-2xl font-bold">Create Invoice</h1>
      <Group className="flex w-full">
        <TextInput
          required
          className="w-1/3"
          label="Invoice Number:"
          placeholder="Enter Invoice Number"
          value={invoiceNumber}
          onChange={(event) => setInvoiceNumber(event.currentTarget.value)}
        />

        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setInvoiceData((prev) => ({ ...prev, client: val }));
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              className="w-1/3"
              label="Select Client"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => combobox.toggleDropdown()}
              rightSectionPointerEvents="none"
            >
              {clients.find((c) => c.id === Number(invoiceData.client))
                ?.name || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Group>

      <Flex className="flex-col w-full border border-gray-300 rounded-lg p-4">
        <h2>Add Items</h2>
        <Flex className="items-center gap-4">
          <Box className="flex space-x-4 my-2">
            <TextInput
              placeholder="Enter Item"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <NumberInput
              placeholder="Enter Price"
              value={price}
              onChange={setPrice}
            />
          </Box>
          <Button loading={isAdding} onClick={handleAddItems}>
            Add
          </Button>
        </Flex>
        <Box className="flex gap-2 items-start my-2">
          {invoiceItems?.map((item, index) => (
            <>
              <Box
                variant="outline"
                key={index}
                className="p-3 border border-blue-300 rounded-lg text-primary-default gap-2 items-center flex"
              >
                <p className="font-bold"> {index + 1}:</p> {item.description} -{" "}
                {item.price}
                {isAdding ? (
                  <Loader size="20px" />
                ) : (
                  <IconX
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(item.id)}
                    size="20px"
                  />
                )}
              </Box>
            </>
          ))}
        </Box>
      </Flex>
      <Group className="flex w-full">
        <NumberInput
          required
          label="Total"
          className="w-1/3"
          placeholder="Enter Total Amount"
          value={invoiceData.total}
          onChange={(num) =>
            setInvoiceData((prev) => ({ ...prev, total: Number(num) }))
          }
        />
        <DateInput
          className="w-1/3"
          value={invoiceData.dueDate}
          onChange={(date) =>
            setInvoiceData((prev) => ({ ...prev, dueDate: date }))
          }
          label="Due Date"
          placeholder="Pick date"
        />
      </Group>
      <Group justify="end">
        <Button loading={isAdding} onClick={handleSubmit}>
          Update
        </Button>
        <Button
          disabled={isAdding}
          variant="outline"
          color="red"
          onClick={handleDeleteInvoice}
        >
          Delete
        </Button>
        <Button onClick={handleExport} variant="gradient">
          Export As PDF
        </Button>
      </Group>
    </Paper>
  );
};

export default UpdateInvoice;
