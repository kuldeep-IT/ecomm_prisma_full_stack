"use client"

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useTransition } from 'react'
import { deleteProduct, toggleProductAvailability } from '../../_actions/Products'

export const ActiveToggleDropDownItem = ({
    id,
    isAvailableForPurchase
}: {
    id: string,
    isAvailableForPurchase: boolean
}) => {

    const [isPending, startTransition] = useTransition()

  return (
    <DropdownMenuItem 
    disabled={isPending}
    onClick={()=>{
        startTransition(async ()=>{
            await toggleProductAvailability(id, !isAvailableForPurchase)
        })
    }}>
        {
            isAvailableForPurchase ? "Deactivate" : "Activate"
        }
    </DropdownMenuItem>
  )
}

export const DeleteDropDownItem = ({
    id,
    disabled
}:{
    id: string,
    disabled: boolean
}) =>{
 const [isPending, startTransition] = useTransition()

  return (
    <DropdownMenuItem 
    disabled={isPending || disabled}
    onClick={()=>{
        startTransition(async ()=>{
            await deleteProduct(id)
        })
    }}>
        Delete
    </DropdownMenuItem>
  )
}

// export {
//     ActiveToggleDropDownItem,
//     DeleteDropDownItem
// } 