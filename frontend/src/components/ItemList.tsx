import axios from "axios";
import { useEffect } from "react";

const ItemList = () => {
  const getItems = async () => {
    const resp = axios.get(
      "http://grocery-backend.kamrankhanblog.net:3000/user/checkItems"
    );
    console.log((await resp).data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return <div>ItemList</div>;
};

export default ItemList;
