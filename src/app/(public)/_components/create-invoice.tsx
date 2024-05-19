"use client";
import { useState } from "react";

import { notify } from "@/components/notification/notification";
import { useAuth } from "@/providers/context";
import { InvoiceData } from "@/types/invoice";
import {
  Badge,
  Box,
  Button,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  NumberInput,
  Paper,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { createInvoice } from "../create-invoice/_action/createInvoice";

interface Props {
  clients: { id: number; name: string; email: string }[];
}

const initialInvoice: InvoiceData = {
  number: "",
  client: "",
  items: [],
  total: 0,
  dueDate: null,
};

const CreateInvoice = ({ clients }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/auth/sign-in");
  }

  const [description, setDescription] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [price, setPrice] = useState<string | number>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoice);

  const handleSubmit = async () => {
    if (!invoiceNumber || !invoiceData.client || !invoiceData.items.length) {
      return notify("Error", "Please fill in");
    }
    setIsAdding(true);
    const d = {
      ...invoiceData,
      number: invoiceNumber,
      userId: user?.id,
    };

    const { data, error } = await createInvoice(d);
    if (data) notify("Success", "Invoice Created Successfully");
    else if (error) {
      notify("Error", "Something went wrong");
      console.log(error);
    }
    setIsAdding(false);
  };

  const options = clients.map((item) => (
    <Combobox.Option value={JSON.stringify(item.id)} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Paper className="container mx-auto space-y-5 px-6 py-8 ">
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
          <Button
            onClick={() => {
              setInvoiceData((prev) => ({
                ...prev,
                items: [...prev.items, { description, price: Number(price) }],
              }));
              setDescription("");
              setPrice("");
            }}
          >
            Add
          </Button>
        </Flex>
        <Box className="flex gap-2 items-start my-2">
          {invoiceData.items.map((item, index) => (
            <Badge variant="outline" key={index} className="p-3">
              <span className="font-bold"> {index + 1}:</span>{" "}
              {item.description} - {item.price}
            </Badge>
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
          Submit
        </Button>
        <Button
          disabled={isAdding}
          variant="outline"
          onClick={() => setInvoiceData(initialInvoice)}
        >
          Clear
        </Button>
      </Group>
    </Paper>
  );
};

export default CreateInvoice;
