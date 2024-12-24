import { Item } from "../../../backend/src/models/model";
import { Separator } from "./ui/separator";

interface Props {
  Item: Item;
}

const ItemTotal = ({ Item }: Props) => {
  return (
    <div className="flex items-center  w-full ">
      <div className="w-1/5 flex flex-col">
        <div>{Item.name}</div>
        <div className="font-light text-xs">
          ({Item.quantity} * {Item.price})
        </div>
      </div>
      <div className="w-3/5">
        <Separator className="w-full " />
      </div>
      <div className="w-1/5 flex justify-end">{Item.price * Item.quantity}</div>
    </div>
  );
};

export default ItemTotal;
