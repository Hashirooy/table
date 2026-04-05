export const filteredByStatusFunc = (arr: {}[], status: string) => {
  if (status === "") {
    return arr;
  }
  return arr.filter((item: any) => {
    return item.properties?.status === status;
  });
};
