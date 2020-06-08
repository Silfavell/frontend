/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Product from './Product'

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

class CarouselComponent extends React.Component {
    render() {
        return (
            <div className='col-md-12 carousel-container'>
                <Carousel
                    containerClass='carousel-container'
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                    autoPlay={false}
                >
                    {
                        this.props.products.map((product) => (
                            <Product key={product._id} item={product} />
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}

export default CarouselComponent