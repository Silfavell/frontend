/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Product from './Product'

import img from '../style/images/prod_1.png'

const product = {
    img,
    name: 'Roc Leke Karşıtı Güneş Koruma Kremi SPF 50 50 ml',
    price: 54.50
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
            onSelect={handleSelect}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                    <Carousel.Item>
                        <div className="col-md-12">
                            <div className="row">
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