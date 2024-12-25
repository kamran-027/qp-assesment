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
import { itemCartAtom, items } from "@/atom/atom";
import { Item } from "../../../backend/src/models/model";
import ItemTotal from "./ItemTotal";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";

const Checkout = () => {
  const [itemsCart, setItemCart] = useRecoilState<Item[]>(itemCartAtom);
  const [_, setItemList] = useRecoilState<Item[]>(items);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false);
  const [isCheckoutCartOpen, setIsCheckoutCartOpen] = useState<boolean>(false);

  const removeItems = () => {
    setItemCart([]);
  };

  const getItems = async () => {
    const resp = await axios.get(
      "http://grocery-backend.kamrankhanblog.net:3000/user/checkItems"
    );

    setItemList(resp.data.items);
  };

  useEffect(() => {
    setIsCartEmpty(itemsCart.length === 0);
  }, [itemsCart]);

  const buyItem = async () => {
    await axios.post(
      "http://grocery-backend.kamrankhanblog.net:3000/user/buyItems",
      itemsCart
    );
    setIsCheckoutCartOpen(false);
    toast("Item bought Sucessfully!", { position: "top-center" });
    getItems();
  };

  return (
    <div>
      <Dialog open={isCheckoutCartOpen} onOpenChange={setIsCheckoutCartOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setIsCheckoutCartOpen(true)}>
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
