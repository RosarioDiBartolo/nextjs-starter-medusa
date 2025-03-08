"use client"
import ProductActionsWrapper from "@modules/products/templates/product-actions-wrapper"
import React, { PropsWithChildren, Suspense } from "react"
import ProductActions from "../product-actions"
import { StoreProduct, StoreRegion } from "@medusajs/types"
import { useVariant } from "../product-actions/useVariant"

function ProductShow({
  product,
  region,
  children,
}: PropsWithChildren<{ product: StoreProduct; region: StoreRegion }>) {
  const variantInfo = useVariant(product)
  const {selectedVariant} = variantInfo
  return (
    <>
      <div className="block w-full relative">
         
      </div>
      <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
        {children}
       <ProductActions {...variantInfo} product={product} region={region} />
      </div>
    </>
  )
}

export default ProductShow
