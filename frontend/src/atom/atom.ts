import { atom } from "recoil";
import { Item } from "../../../backend/src/models/model";

export const itemCartAtom = atom<Item[]>({
  key: "itemToBuy",
  default: [],
});

export const items = atom<Item[]>({
  key: "itemList",
  default: [],
});
