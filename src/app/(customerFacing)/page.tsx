import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const getMostPopularProducts = () => {
    return db.product.findMany({
        where: {
            isAvailableForPurchase: true
        },
        orderBy: {
            orders: {
                _count: 'desc'
            }
        },
        take: 6
    })
}

const getNewestProducts = () => {
    return db.product.findMany({
        where: {
            isAvailableForPurchase: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 6
    })
}

const HomePage = () => {
    return (
        <main className='space-y-12'>
            <ProductGridSection
                title="Most Popular Products"
                productFetcher={getMostPopularProducts}
            />

            <ProductGridSection
                title="Newest Products"
                productFetcher={getNewestProducts}
            />
        </main>
    )
}

type ProductGridSectionProps = {
    title: string
    productFetcher: () => Promise<Product[]>
}

const ProductGridSection = async ({
    title, productFetcher
}: ProductGridSectionProps) => {
    return (
        <>
            <div className='space-y-4'>
                <div className='flex gap-4 justify-between items-center'>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                    <Button variant={'outline'} asChild>
                        <Link href={"/products"} className='space-x-2'>
                            <span>View All</span>
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                    </Button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        (await productFetcher()).map((product) => (
                            <>
                                <ProductCard key={product.id} {...product} />
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HomePage