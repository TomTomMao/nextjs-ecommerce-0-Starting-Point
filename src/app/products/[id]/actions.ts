"use server";

import { createCart, createCartItem, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await createCartItem(cart.id, productId, 1);
  }

  revalidatePath("/products/[id]")
}
