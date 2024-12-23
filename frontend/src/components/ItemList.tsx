import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../../../backend/src/models/model";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const [itemList, setItemList] = useState<Item[]>();

  const getItems = async () => {
    const resp = await axios.get(
      "http://grocery-backend.kamrankhanblog.net:3000/user/checkItems"
    );
    console.log(resp.data.items);
    setItemList(resp.data.items);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className=" inline-flex h-full p-5 gap-3">
      {itemList && itemList.map((item: Item) => <ItemCard item={item} />)}
    </div>
  );
};

export default ItemList;
