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
import axios from "axios";
import { toast } from "sonner";

const Checkout = () => {
  const [itemsCart, setItemCart] = useRecoilState<Item[]>(itemCartAtom);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false);
  const [isCheckoutCartOpen, setsCheckoutCartOpen] = useState<boolean>(false);

  const removeItems = () => {
    setItemCart([]);
  };

  useEffect(() => {
    setIsCartEmpty(itemsCart.length === 0);
  }, [itemsCart]);

  const buyItem = async () => {
    await axios.post(
      "http://grocery-backend.kamrankhanblog.net:3000/admin/addItem",
      itemsCart
    );
    setsCheckoutCartOpen(false);
    toast("Item bought Sucessfully!", { position: "top-center" });
  };

  return (
    <div>
      <Dialog open={isCheckoutCartOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setsCheckoutCartOpen(true)}>
            Checkout
          </Button>
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
              <Button type="submit" onClick={buyItem}>
                Buy
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
