/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { Carousel } from 'react-bootstrap'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'


function ProductImages({ images }) {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <Carousel
            activeIndex={index}
            controls={images.length > 1}
            indicators={images.length > 1}
            interval={null}
            prevIcon={<IoIosArrowBack size={24} color='black' />}
            nextIcon={<IoIosArrowForward size={24} color='black' />}
            onSelect={handleSelect}>
            {
                images.map((image) => (
                    <Carousel.Item key={image}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
                            <img
                                src={image}
                                alt=''
                                onError={(event) => {
                                    event.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                                }}
                                className='img-fluid'
                            />
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default ProductImages