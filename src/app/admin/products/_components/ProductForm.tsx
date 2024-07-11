"use client"

// import addProduct from '@/app/admin/_actions/Products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/formatters'
import React, { useActionState, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { addProduct, updateProduct } from '../../_actions/Products'
import { Product } from "@prisma/client"
import Image from "next/image"

const ProductForm = ({ product }: { product?: Product | null }) => {

    console.log("PRODUCT:::", product)

    const [error, action] = useFormState(
        product == null ? addProduct : updateProduct.bind(null, product.id),
        {}
    )
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

    return (
        <>
            <form action={action} className='space-y-8'>
                <div className='space-y-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        type='text'
                        name='name'
                        required
                        defaultValue={product?.name || ""}
                    />
                    {
                        error?.name && <p className='text-red-500'>{error.name}</p>
                    }
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='name'>Price In Cents</Label>
                    <Input
                        value={priceInCents}
                        onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
                        type='number'
                        id='priceInCents'
                        name='priceInCents'
                        required />
                    {
                        error?.priceInCents && <p className='text-red-500'>{error.priceInCents}</p>
                    }
                </div>

                <div className='text-muted-foreground'>
                    {
                        formatCurrency((priceInCents || 0) / 100)
                    }
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea id='description' name='description' required
                        defaultValue={product?.description || ""}
                    />
                    {
                        error?.description && <p className='text-red-500'>{error.description}</p>
                    }
                </div>


                <div className='space-y-2'>
                    <Label htmlFor='file'>File</Label>
                    <Input
                        type='file'
                        id='file'
                        name='file'
                        required={product == null}
                    />
                    {
                        product != null &&
                        <div className='text-muted-foreground'>
                            {product.filePath}
                        </div>
                    }
                    {
                        error?.file && <p className='text-red-500'>{error.file}</p>
                    }
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='image'>Image</Label>
                    <Input
                        type='file'
                        id='image'
                        name='image'
                        required={product == null}
                    />
                    {
                        product != null && <>
                            {/* <Image
                                src={product.imagePath}
                                height={400}
                                width={400}
                                alt='product image'
                            /> */}
                        </>
                    }
                    {
                        error?.image && <p className='text-red-500'>{error.image}</p>
                    }
                </div>

                <SubmitButton />
            </form>
        </>
    )
}


const SubmitButton = () => {

    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}

export default ProductForm