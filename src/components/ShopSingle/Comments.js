import React from 'react'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'

class Comments extends React.Component {

    renderDetailRow = ({ title, value, first }) => (
        <div className={`col-md-12 ${!first ? 'border-top' : ''}`}>
            <div className='row'>
                <div className='col-3 py-2 bg-light'>{title}</div>
                <div className='border-left col-9 py-2'>
                    <strong className='text-black'>{value}</strong>
                </div>
            </div>
        </div>
    )

    renderComment = () => (
        <div className='col-md-12 mb-4'>
            <div className='row p-3'>
                <div className='col-md-3'>
                    <div>
                        <b style={{ fontSize: 20 }} className='text-black'>cenab ı GOD</b>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        <IoIosStar size={24} color='orange' />
                        <IoIosStarHalf size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                    </div>
                    <br />
                    <b style={{ fontSize: 20 }} className='text-black'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur minus consequuntur enim ullam debitis, omnis vel! Quod quisquam adipisci, perferendis facere excepturi labore, tenetur sint, ipsum nobis ullam laudantium consequatur!</b>
                    <p style={{ fontSize: 17 }} className='text-black mb-5 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fugiat repellendus, ratione impedit maxime consequatur pariatur temporibus est eius expedita voluptatem inventore delectus adipisci voluptatibus libero quis accusantium asperiores ullam.</p>

                    <span style={{ fontSize: 17 }} className='mt-5 text-black font-weight-bolder'>Yardımcı oldu mu ?</span>
                    <span style={{ fontSize: 17, borderRadius: '.25rem', cursor: 'pointer' }} className='ml-3 text-white font-weight-bolder bg-secondary px-3 py-1'>Evet</span>
                    <span style={{ fontSize: 17, borderRadius: '.25rem', cursor: 'pointer' }} className='ml-3 text-white font-weight-bolder bg-secondary px-3 py-1'>Hayır</span>
                    <span style={{ fontSize: 17, borderRadius: '.25rem', cursor: 'pointer' }} className='ml-3 text-white font-weight-bolder bg-secondary px-3 py-1'>Bildir</span>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
    )

    render() {
        return (
            <div className='p-4 border-bottom'>
                <div className='col-md-12'>
                    <p style={{ whiteSpace: 'break-spaces', fontSize: 17 }}>
                        {

                        }
                    </p>
                </div>

                {
                    // this.props.specifications.length > 0 && (
                    true && (
                        [1, 2, 3].map(() => (
                            this.renderComment()
                        ))
                    )
                }
            </div>
        )
    }
}

export default Comments