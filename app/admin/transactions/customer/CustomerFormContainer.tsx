"use client";
import React, { useState } from "react";
import CustomerItemTable, { ItemFormEntry } from "./CustomerItemTable";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Customer {
  id: number;
  name: string;
  address: string;
  termId: number;
}

interface Term {
  id: number;
  days: string;
}

interface Props {
  customers: Customer[];
  terms: Term[];
}

const CustomerFormContainer = ({ customers, terms }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [term, setTerm] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [invoicePrefix, setInvoicePrefix] = useState<"INT" | "CAL" | "W">(
    "INT"
  );
  const [isExistingCustomer, setIsExistingCustomer] = useState<boolean>(false);
  const [customer, setCustomer] = useState<number>(0);
  const [warehouse, setWarehouse] = useState(1);

  const handleNameChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const old = customers.filter(
      (customer) => customer.name === e.target.value
    );

    if (old.length > 0) {
      setIsExistingCustomer(true);
      setAddress(old[0].address);
      setTerm(old[0].termId);
      setName(old[0].name);
      setCustomer(old[0].id);
    } else {
      setCustomer(0);
      setIsExistingCustomer(false);
      setName(e.target.value);
      setAddress("");
      setTerm(1);
    }
  };

  const handleCreateInvoice = (data: ItemFormEntry[]) => {
    const body = {
      customer: {
        id: customer,
        existingCustomer: isExistingCustomer,
        name: name,
        address: address,
        termId: term,
      },
      invoiceNumber: invoicePrefix,
      invoiceDate: date,
      transactions: data,
      totalAmount: data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
      setLoading(true);
      axios
        .post("/api/transactions/customer", body)
        .then((res) => {
          setLoading(false);
          router.push(`/admin/invoices/customer/${res.data.id}`);
          router.refresh();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="flex w-[900px] justify-between">
        <div className="flex-row w-[60%]">
          <div className="mb-2">
            <label className="form-control w-full">
              <input
                placeholder="INVOICE FOR"
                className="input input-bordered input-sm w-full"
                type="text"
                list="customers"
                onBlur={handleNameChange}
              />
              <datalist id="customers">
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.name}></option>
                ))}
              </datalist>
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <input
                placeholder="ADDRESS"
                className="input input-bordered input-sm w-full"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={isExistingCustomer}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Price Group:</span>
              </div>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={invoicePrefix}
                onChange={(e) =>
                  setInvoicePrefix(e.target.value as "INT" | "CAL" | "W")
                }
              >
                <option value="INT">Interbranch</option>
                <option value="CAL">Caloocan</option>
                <option value="W">Warehouse</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex-row">
          <div className="mb-2">
            <label className="form-control w-full max-w-xs">
              <input
                className="input input-bordered input-sm w-full max-w-xs"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                disabled={isExistingCustomer}
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value))}
              >
                {terms.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.days} {term.days === "CASH" ? "" : "days"}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Warehouse</span>
              </div>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={warehouse}
                onChange={(e) => setWarehouse(parseInt(e.target.value))}
              >
                <option value="1">Warehouse 1</option>
                <option value="2">Warehouse 2</option>
                <option value="3">Warehouse 3</option>
              </select>
            </label>
          </div>
        </div>
      </section>
      <section>
        <CustomerItemTable
          onSave={(data) => handleCreateInvoice(data)}
          prefix={invoicePrefix}
          loading={loading}
        />
      </section>
    </>
  );
};

export default CustomerFormContainer;
