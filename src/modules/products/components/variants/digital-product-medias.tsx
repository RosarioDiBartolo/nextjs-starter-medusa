"use client"

import React, { useEffect, useState } from "react"
import ThreeDimView from "../3d-view"
import { VariantWithDigitalProduct } from "types/global"
import { getDigitalProductPreview } from "@lib/data/products"

export default function ProductMedias({
  variant,
}: {
  variant: VariantWithDigitalProduct
}) {
  const [downloadUrls, setDownloadUrls] = useState<{ url: string; id: string; }[] | null>(
    null
  )

  useEffect(() => {
    async function fetchPreview() {
      if (!variant.digital_product) return

      try {
        const data = await getDigitalProductPreview({
          id: variant.digital_product.id,
        })
        setDownloadUrls(data)
      } catch (error) {
        console.error("Error fetching digital product preview:", error)
      }
    }

    fetchPreview()
  }, [variant]) // Runs when `variant` changes

  if (!downloadUrls) return <p>Loading variant media...</p>

  console.log(downloadUrls)
  return (
    <div className="block w-full relative">
      {downloadUrls.map((m, index) => (
        <ThreeDimView
          key={index}
          mediaSrc={    m.url.replace("http://localhost:9000/static/",  "/api/fetchFile/") }
        />
      ))}
    </div>
  )
}
