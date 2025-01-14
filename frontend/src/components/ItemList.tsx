import axios from "axios";
import { useEffect } from "react";
import { Item } from "../../../backend/src/models/model";
import ItemCard from "./ItemCard";
import { useRecoilState } from "recoil";
import { itemCartAtom, items } from "@/atom/atom";

const ItemList = () => {
  const [itemList, setItemList] = useRecoilState<Item[]>(items);
  const [_, setItemCart] = useRecoilState<Item[]>(itemCartAtom);

  const getItems = async () => {
    const resp = await axios.get("https://grocery-backend.kamrankhanblog.net/user/checkItems");

    setItemList(resp.data.items);
  };

  const addItemToCart = (item: Item) => {
    setItemCart((prev) => [...prev, item]);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className=" inline-flex h-full p-5 gap-3">
      {itemList && itemList.map((item: Item) => <ItemCard item={item} addItem={addItemToCart} />)}
    </div>
  );
};

export default ItemList;
