/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Product from './Product'

const product = {
    img: `${process.env.PUBLIC_URL}/product.jpg`,
    name: 'Black and White stripes Dress',
    price: 114.50
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
}

function ControlledCarousel() {
    return (
        <div className='col-md-12 carousel-container'>
            <Carousel
                containerClass='carousel-container'
                responsive={responsive}
                renderButtonGroupOutside={true}
                autoPlay={false}
            >
                <Product item={product} />
                <Product item={product} />
                <Product item={product} />
                <Product item={product} />
                <Product item={product} />
                <Product item={product} />
                <Product item={product} />
            </Carousel>
        </div>
    )
}

export default ControlledCarousel