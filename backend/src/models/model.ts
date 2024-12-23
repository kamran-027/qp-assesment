import zod from "zod";

export const itemInputObject = zod.object({
  name: zod.string(),
  price: zod.number(),
  quantity: zod.number(),
});

export const updateItemObject = zod.object({
  name: zod.string(),
  price: zod.number(),
});

export const updateItemQty = zod.object({
  quantity: zod.number(),
});

export const buyItemType = zod.array(
  zod.object({
    name: zod.string(),
    quantity: zod.number(),
  })
);

export type Item = zod.infer<typeof itemInputObject>;
