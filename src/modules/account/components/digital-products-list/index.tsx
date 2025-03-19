"use client"

import { Table } from "@medusajs/ui"
import { DigitalProduct } from "../../../../types/global"

type Props = {
  digitalProducts: DigitalProduct[]
}

export const DigitalProductsList = ({
  digitalProducts,
}: Props) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {digitalProducts.map((digitalProduct) => {
          const medias = digitalProduct.medias 
          const showMediaCount = (medias?.length || 0) > 1
          return (
            <Table.Row key={digitalProduct.id}>
              <Table.Cell>
                {digitalProduct.name}
              </Table.Cell>
              <Table.Cell>
                <ul>
                  {medias?.map((media, index) => (
                    <li key={media.id}>
                      <a href="#">
                        Download{showMediaCount ? ` ${index + 1}` : ``}
                      </a>
                    </li>
                  ))}
                </ul>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}