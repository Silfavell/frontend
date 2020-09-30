/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import Carousel from 'react-multi-carousel'
import Cookies from 'universal-cookie'
import 'react-multi-carousel/lib/styles.css'

import Product from './Product/Product'

const cookies = new Cookies()

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

class CarouselComponent extends React.PureComponent {
    render() {
        const favoriteProducts = localStorage.getItem('favoriteProducts') ? JSON.parse(localStorage.getItem('favoriteProducts')) : []
        const loggedIn = cookies.get('token')

        return (
            <div className={`col-md-12 carousel-container ${this.props.shopSingle ? 'px-0' : ''}`}>
                <Carousel
                    containerClass='carousel-container'
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                    autoPlay={false}
                >
                    {
                        this.props.products.map((product) => (
                            <Product
                                key={product._id}
                                favorite={favoriteProducts.includes(product._id)}
                                item={product}
                                loggedIn={loggedIn}
                                onIncreaseClick={this.props.onIncreaseClick} />
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}

export default CarouselComponent