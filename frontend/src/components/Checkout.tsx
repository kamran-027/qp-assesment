import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { itemCartAtom } from "@/atom/atom";
import { Item } from "../../../backend/src/models/model";
import ItemTotal from "./ItemTotal";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";

const Checkout = () => {
  const [itemsCart, setItemCart] = useRecoilState<Item[]>(itemCartAtom);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false);

  const removeItems = () => {
    setItemCart([]);
  };

  useEffect(() => {
    setIsCartEmpty(itemsCart.length === 0);
  }, [itemsCart]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Item Cart</DialogTitle>
            <DialogDescription>Check list of items to buy</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {isCartEmpty ? (
              <div className="w-full flex items-center justify-center">
                <Label>No Items added</Label>
              </div>
            ) : (
              <div>
                {itemsCart.map((item: Item) => (
                  <ItemTotal Item={item} />
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <div
              className={`flex justify-between w-full ${
                isCartEmpty ? "hidden" : "block"
              }`}
            >
              <Button type="button" variant={"outline"} onClick={removeItems}>
                Remove Items
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
