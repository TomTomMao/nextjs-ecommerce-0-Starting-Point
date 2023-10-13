import PriceTag from '@/components/priceTag'
import prisma from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import AddToCartButton from './AddToCartButton'
import { incrementProductQuantity } from './actions'

interface ProductPageProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()
  return product
})

export async function generateMetadata(
  { params: { id } }: ProductPageProps
): Promise<Metadata> {
  const products = await getProduct(id);
  return {
    title: products.name + " - Flowmazon",
    description: products.description,
    openGraph: {
      images: [{ url: products.imageUrl }],
    }
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className='text-5xl font-bold'>{product.name}</h1>
        <PriceTag price={product.price} className='mt-4'></PriceTag>
        <p className='py-6'>{product.description}</p>
        <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
      </div>
    </div>
  )
}

export default ProductPage