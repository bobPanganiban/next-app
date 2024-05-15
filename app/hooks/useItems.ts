import { useQuery } from "@tanstack/react-query";
import { ItemDetails } from "../entities/entities";
import axios from "axios";
import * as _ from "lodash";

const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return await axios.get("/api/items");
    },
  });
};

const useUploadedItems = (data: any) => {
  let items: ItemDetails[] = [];
  _.map(data, (tab: any) => {
    if (tab["__EMPTY"] !== "SUPPLIER") {
      let item: ItemDetails = {
        supplier: tab["__EMPTY"],
        brand: tab["__EMPTY_1"],
        unit: tab["__EMPTY_2"],
        description: {
          desc1: tab["__EMPTY_3"],
          desc2: tab["__EMPTY_4"],
          desc3: tab["__EMPTY_5"] || "",
        },
        srpAndDiscount: {
          unitPrice: tab["SUPPLIERS SRP AND DISCOUNT"],
          discount1: tab["__EMPTY_6"],
          discount2: tab["__EMPTY_7"],
          discount3: tab["__EMPTY_8"],
          discount4: tab["__EMPTY_9"],
        },
        customerPrice: {
          ib: tab["PRICES OF DIFFERENT TYPE OF CUSTOMERS"],
          c1: tab["__EMPTY_10"],
          c2: tab["__EMPTY_11"],
          c3: tab["__EMPTY_12"],
          w1: tab["__EMPTY_13"],
          w2: tab["__EMPTY_14"],
          w3: tab["__EMPTY_15"],
        },
      };
      items.push(item);
    }
  });

  return items;
};

export { useItems, useUploadedItems };
