import React from 'react'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'
import Cookies from 'universal-cookie'

import WriteReviewPopup from './WriteReviewPopup'

import './Comments.css'

const cookies = new Cookies()

class Comments extends React.Component {

    state = {
        showWriteReviewPopup: true
    }

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

    renderComment = ({ ownerAlias, title, comment }) => (
        <div className='col-md-12 mb-2'>
            <div className='row p-3'>
                <div className='col-md-3'>
                    <div>
                        <b style={{ fontSize: 18, wordBreak: 'break-word' }} className='text-black'>{ownerAlias}</b>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='pb-3'>
                        <IoIosStar size={24} color='orange' />
                        <IoIosStarHalf size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                        <IoIosStarOutline size={24} color='orange' />
                    </div>
                    <b style={{ fontSize: 18 }} className='text-black font-weight-bold'>{title}</b>
                    <p style={{ fontSize: 16 }} className='text-black mb-5 mt-3 font-weight-bolder'>{comment}</p>

                    <div>
                        <span style={{ fontSize: 16 }} className='text-black font-weight-bolder mr-4'>Yardımcı oldu mu ?</span>
                        <span style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }} className='text-white font-weight-bolder bg-secondary px-3 py-1'>Evet</span>
                        <span style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }} className='ml-2 text-white font-weight-bolder bg-secondary px-3 py-1'>Hayır</span>
                        <span style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }} className='ml-2 text-white font-weight-bolder bg-secondary px-3 py-1'>Bildir</span>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    )

    onWriteReviewClick = () => {
        if (cookies.get('token')) {
            this.setState({ showWriteReviewPopup: true })
        } else {
            alert('need login') // TODO
        }
    }

    hideWriteReviewPopup = () => {
        this.setState({ showWriteReviewPopup: false })
    }

    render() {
        return (
            <div className='p-4'>

                {
                    this.state.showWriteReviewPopup && <WriteReviewPopup productId={this.props.productId} hideWriteReviewPopup={this.hideWriteReviewPopup} />
                }

                <div className='col-md-12 text-black py-4'>
                    <div className='row justify-content-end'>
                        <span
                            style={{ borderRadius: '0.25rem', cursor: 'pointer', backgroundColor: '#EE4266' }}
                            onClick={this.onWriteReviewClick}
                            id='write-review'
                            className='text-white font-weight-bolder text-align-center px-4 py-2'>Değerlendirme Yazın</span>
                    </div>
                </div>

                {
                    this.props.comments.length > 0 && (
                        this.props.comments.map(this.renderComment)
                    )
                }
            </div>
        )
    }
}

export default Comments