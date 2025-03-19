"use client"

import React, { PropsWithChildren, Suspense } from "react"
import ProductActions from "../product-actions"
import { StoreProduct, StoreRegion } from "@medusajs/types"
import { useVariant } from "../product-actions/useVariant"
import DigitalProductMedias from "./digital-product-medias"

function Variants({
  product,
  region,
  children,
}: PropsWithChildren<{ product: StoreProduct; region: StoreRegion }>) {
  const variantInfo = useVariant(product)
  const { selectedVariant } = variantInfo

  return (
    <div className=" flex-1 flex gap-3  ">
      {selectedVariant && <DigitalProductMedias variant={selectedVariant} />}

      <div className="flex flex-col  small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
        {children}
        <ProductActions {...variantInfo} product={product} region={region} />
      </div>
    </div>
  )
}

export default Variants
