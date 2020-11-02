import React from 'react'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'

import { likeComment, unlikeComment } from '../../scripts/requests'

import WriteReviewPopup from './WriteReviewPopup'
import Comment from './Comment'

import './Comments.css'

const cookies = new Cookies()

class Comments extends React.Component {

    state = {
        showWriteReviewPopup: false,
        comments: this.props.comments
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

    onLikeClick = async (_id, alreadyLiked) => {
        const { status, data } = await alreadyLiked ? unlikeComment(_id) : likeComment(_id)

        if (status === 200) {
            this.setState({
                comments: this.state.comments.map((comment) => {
                    if (comment._id === data._id) {
                        return data
                    }

                    return comment
                })
            })
        }
    }

    onDislikeClick = async (_id, alreadyDisliked) => {
        const { status, data } = await alreadyDisliked ? unlikeComment(_id) : likeComment(_id)

        if (status === 200) {
            this.setState({
                comments: this.state.comments.map((comment) => {
                    if (comment._id === data._id) {
                        return data
                    }

                    return comment
                })
            })
        }
    }

    onReportClick = (_id) => {
        VanillaToasts.create({
            title: 'Yorum Bildirildi',
            positionClass: 'topRight',
            type: 'success',
            timeout: 3 * 1000
        })
    }

    onWriteReviewClick = () => {
        if (cookies.get('token')) {
            this.setState({ showWriteReviewPopup: true })
        } else {
            window.history.pushState({}, null, '/sign-in')
            window.location.reload()
        }
    }

    hideWriteReviewPopup = (comment) => {
        if (comment) {
            this.state.comments.unshift(comment)
            this.setState({ showWriteReviewPopup: false, comments: this.state.comments })
        } else {
            this.setState({ showWriteReviewPopup: false })
        }
    }

    renderComment = (comment) => (
        <Comment
            item={comment}
            onLikeClick={this.onLikeClick}
            onDislikeClick={this.onDislikeClick}
            onReportClick={this.onReportClick} />
    )

    render() {
        return (
            <div className='p-4'>

                {
                    this.state.showWriteReviewPopup && <WriteReviewPopup productId={this.props.productId} hidePopup={this.hideWriteReviewPopup} />
                }

                <div className='col-md-12 text-black py-4'>
                    <div className='row justify-content-end'>
                        <button
                            style={{ borderRadius: '0.25rem', cursor: 'pointer', backgroundColor: '#EE4266' }}
                            onClick={this.onWriteReviewClick}
                            id='write-review'
                            className='btn text-white font-weight-bolder text-align-center px-4 py-2'>{cookies.get('token') ? 'Değerlendirme yazın' : 'Değerlendirme yazmak için giriş yapın'}</button>
                    </div>
                </div>

                {
                    this.state.comments.length > 0 && (
                        this.state.comments.map(this.renderComment)
                    )
                }
            </div>
        )
    }
}

export default Comments