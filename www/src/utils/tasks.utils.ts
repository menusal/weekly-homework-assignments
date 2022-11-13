import { OrderTypes } from "../config";
import { Item } from "../types";

export function getOrderedTasks(tasks: Item[], order: string) {
  return tasks.sort((a, b) => {
      // @ts-ignore
      const dateA = a.date.split("-").join("-");
      // @ts-ignore
      const dateB = b.date.split("-").join("-");

      return order === OrderTypes.DESC ? dateA > dateB ? -1 : dateA < dateB ? 1 : 0 : dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
}
