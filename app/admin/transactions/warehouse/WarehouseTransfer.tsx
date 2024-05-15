"use client";
import React, { useState } from "react";

const WarehouseTransfer = () => {
  const warehouses = [1, 2, 3];
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();

  return (
    <div>
      From:
      <select name="" id="" value={from}>
        {warehouses.map((warehouse: number, index: number) => (
          <option value={warehouse} key={index}>
            Warehouse {warehouse}
          </option>
        ))}
      </select>
      To:
      <select name="" id="" value={to}>
        {warehouses.map((warehouse: number, index: number) => (
          <option value={warehouse} key={index}>
            Warehouse {warehouse}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WarehouseTransfer;
