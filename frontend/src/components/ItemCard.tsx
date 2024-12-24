import { useState } from "react";
import { Item } from "../../../backend/src/models/model";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

interface Props {
  item: Item;
  addItem: (item: Item) => void;
}

const ItemCard = ({ item, addItem }: Props) => {
  const [currentCount, SetCurrentCount] = useState<number>(0);

  const incrementCount = () => {
    currentCount !== item.quantity && SetCurrentCount((prev) => (prev += 1));
  };

  const decerementCount = () => {
    currentCount !== 0 && SetCurrentCount((prev) => (prev -= 1));
  };

  return (
    <Card className="w-48 h-60">
      <CardHeader>
        <CardTitle className="text-center">
          {item.name.toLocaleUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4 items-start justify-start">
          <div>
            <Label>Name: </Label>
            {item.name}
          </div>
          <div>
            <Label>Price: </Label>
            {item.price}
          </div>
          <div>
            <Label>Available QTY: </Label>
            {item.quantity}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            const buyItem: Item = {
              name: item.name,
              quantity: currentCount,
              price: item.price,
            };
            addItem(buyItem);
          }}
        >
          Add
        </Button>
        <div>
          <Button size={"sm"} variant={"ghost"} onClick={decerementCount}>
            -
          </Button>
          <Label>{currentCount}</Label>
          <Button size={"sm"} variant={"ghost"} onClick={incrementCount}>
            +
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
