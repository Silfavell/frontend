/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { Carousel, Media } from 'react-bootstrap'

function ProductImages({ _id, images }) {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
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
            onSelect={handleSelect}>
            {
                images.map((image) => (
                    <Carousel.Item key={image}>
                        <div style={{ display: 'flex', marginRight:'10vh',width: '100%', justifyContent: 'center' }}>
                            <img
                                src={image}
                                style={{minWidth:'384px',height:'455.4px'}}
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