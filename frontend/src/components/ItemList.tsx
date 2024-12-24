import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../../../backend/src/models/model";
import ItemCard from "./ItemCard";
import { useRecoilState } from "recoil";
import { itemCartAtom } from "@/atom/atom";

const ItemList = () => {
  const [itemList, setItemList] = useState<Item[]>();
  const [_, setItemCart] = useRecoilState<Item[]>(itemCartAtom);

  const getItems = async () => {
    const resp = await axios.get(
      "http://grocery-backend.kamrankhanblog.net:3000/user/checkItems"
    );

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
      {itemList &&
        itemList.map((item: Item) => (
          <ItemCard item={item} addItem={addItemToCart} />
        ))}
    </div>
  );
};

export default ItemList;
