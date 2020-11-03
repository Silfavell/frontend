/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'

import { Carousel } from 'react-bootstrap'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

function ProductImages({ _id, images }) {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    useEffect(() => {
        setIndex(0)
    }, [_id])

    return (
        <Carousel
            activeIndex={index}
            controls={images.length > 1}
            indicators={images.length > 1}
            interval={null}
            prevIcon={<IoIosArrowBack size={24} color='black' />}
            nextIcon={<IoIosArrowForward size={24} color='black' />}
            onSelect={handleSelect}
        >
            {
                images.map((image) => (
                    <Carousel.Item key={image}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                            <img
                                src={image}
                                alt=''
                                className='img-fluid' />
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default ProductImages
