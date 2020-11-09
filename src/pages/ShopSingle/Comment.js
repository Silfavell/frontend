import React from 'react'

import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

class Comment extends React.Component {
    onLikeClick = () => {
        this.props.onLikeClick(this.props.item._id, this.props.item.likes.includes(localStorage.getItem('_id')))
    }

    onDislikeClick = () => {
        this.props.onDislikeClick(this.props.item._id, this.props.item.dislikes.includes(localStorage.getItem('_id')))
    }

    onReportClick = () => {
        this.props.onReportClick(this.props.item._id)
    }

    render() {
        const {
            ownerAlias, title, comment, verified, likes, dislikes, generalRate
        } = this.props.item

        const alreadyLiked = likes.includes(localStorage.getItem('_id'))
        const alreadyDisliked = dislikes.includes(localStorage.getItem('_id'))

        return (
            <div className='col-md-12 mb-2'>
                <div className='row p-3'>
                    <div className='col-md-3'>
                        <div>
                            <b style={{ fontSize: 18, wordBreak: 'break-word' }} className='text-black'>{ownerAlias}</b>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div className='pb-3'>
                            {
                                [1, 2, 3, 4, 5].map((rate) => {
                                    if (rate <= generalRate) {
                                        return <IoIosStar size={24} color='orange' />
                                    }

                                    return <IoIosStarOutline size={24} color='orange' />
                                })
                            }
                        </div>
                        <b style={{ fontSize: 18 }} className='text-black font-weight-bold'>{title}</b>
                        <p style={{ fontSize: 16 }} className='text-black mb-4 mt-3 font-weight-bolder'>{comment}</p>

                        {
                            verified ? (
                                <div>
                                    <span style={{ fontSize: 16 }} className='text-black font-weight-bolder mr-4'>Yardımcı oldu mu ?</span>
                                    <span
                                        onClick={this.onLikeClick}
                                        style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }}
                                        className={`text-white font-weight-bolder px-3 py-1 ${alreadyLiked ? 'bg-warning' : 'bg-secondary'}`}>
                                        Evet

                                    </span>
                                    <span
                                        onClick={this.onDislikeClick}
                                        style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }}
                                        className={`ml-2 text-white font-weight-bolder px-3 py-1 ${alreadyDisliked ? 'bg-warning' : 'bg-secondary'}`}>
                                        Hayır

                                    </span>
                                    <span
                                        onClick={this.onReportClick}
                                        style={{ fontSize: 16, borderRadius: '.25rem', cursor: 'pointer' }}
                                        className='ml-2 text-white font-weight-bolder px-3 py-1 bg-secondary'>
                                        Bildir

                                    </span>
                                </div>
                            ) : (
                                <div className='px-3 py-1 text-black' style={{ backgroundColor: 'rgb(255 250 204 / 76%)', borderRadius: '.25rem' }}>
                                    Yorum gönderdiğiniz için teşekkür ederiz! Yorumunuz şu anda inceleniyor ve görüntülenmesi için bir kaç gün geçmesi gerekebilir.
                                </div>
                            )
                        }
                    </div>
                    <div className='col-md-2' />
                </div>
            </div>
        )
    }
}

export default Comment
