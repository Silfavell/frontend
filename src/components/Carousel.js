/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Product from './Product'

const product = {
    img: `${process.env.PUBLIC_URL}/product.jpg`,
    name: 'Black and White stripes Dress',
    price: 114.50
}

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <Carousel
            activeIndex={index}
            indicators={false}
            interval={null}
            onSelect={handleSelect}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                    <Carousel.Item>
                        <div className='col-md-12'>
                            <div className='row'>
                                <Product item={product} />
                                <Product item={product} />
                                <Product item={product} />
                                <Product item={product} />
                            </div>
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default ControlledCarousel