/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { Carousel } from 'react-bootstrap'

import bg from '../../../style/images/hero_2.jpg'

function FirstImage() {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    return (
        <Carousel
            activeIndex={index}
            controls={false}
            onSelect={handleSelect}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                    <Carousel.Item key={x}>
                        <div
                            className='site-blocks-cover inner-page'
                            style={{
                                backgroundImage: `url(${bg})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            data-aos='fade'>
                            <div className='container'>
                                <div className='row' />
                            </div>
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default FirstImage
