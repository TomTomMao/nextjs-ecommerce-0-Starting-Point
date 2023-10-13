"use client"

import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartEntry = ({ cartItem: { product, quantity },
  setProductQuantity }: CartEntryProps) => {
  const quantityOptions: JSX.Element[] = [];
  const [isPending, startTransition] = useTransition();

  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(<option key={i}>{i}</option>)
  }
  return (
    <div>
      <div className='flex flex-wrap items-center gap-3'>
        <Image
          src={product.imageUrl}
          alt='Product Image'
          width={200}
          height={200}
          className='rounded-lg'
        />
        <div>
          <Link href={'/product/' + product.id} className='font-bold'>
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select defaultValue={quantity}
              className='select select-bordered w-full max-w-[80px]'
              onChange={e => {
                const newQuantity = parseInt(e.target.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                })
              }}
            >
              <option value={0}>0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
          </div>
          {isPending && <span className='loading loading-spinner loading-sm' />}
        </div>
      </div>
      <div className='divider' />
    </div >
  )
}

export default CartEntry