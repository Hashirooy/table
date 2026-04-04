import { isOrder, isUser } from "../ui/Table/type";

export const filteredFunc = (arr: {}[], search: string) => {
  const q = search.toLowerCase();
  if (!search) {
    return arr;
  }

  if (isUser(arr[0])) {
    console.log("isUser");
    return arr.filter((item: any) => {
      return (
        item.properties?.name.toLowerCase().includes(q) ||
        item.properties?.email.toLowerCase().includes(q)
      );
    });
  }
  if (isOrder(arr[0])) {
    return arr.filter((item: any) => {
      return (
        item.properties?.order.toLowerCase().includes(q) ||
        item.properties?.customer.toLowerCase().includes(q) ||
        item.properties?.product.toLowerCase().includes(q)
      );
    });
  }
  return arr;
};
