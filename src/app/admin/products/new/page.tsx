import React from 'react'
import { PageHeader } from '../../_components/PageHeader'
import ProductForm from '../_components/ProductForm'

const NewProductPage = () => {
    return (
        <>
            <PageHeader>New Product</PageHeader>
            <ProductForm></ProductForm>
        </>
    )
}

export default NewProductPage