import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'

import PopupWrapper from '../PopupWrapper'

class WriteReviewPopup extends React.Component {

    state = {
        title: '',
        comment: '',
        ownerAlias: '',
        email: '',
        isAgreementChecked: false,


        generalEvaluationRateHover: 5
    }

    onConfirm = () => {
        const {
            title,
            comment,
            ownerAlias,
            email
        } = this.state

        axios.post(`${process.env.REACT_APP_API_URL}/user/save-comment`, { productId: this.props.productId, title, comment, ownerAlias, rate: 7 }).then(({ data, status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    // title: `Yorum gönderdiğiniz için teşekkür ederiz! Yorumunuz şu anda inceleniyor ve görüntülenmesi için bir kaç gün geçmesi gerekebilir.`,
                    title: `Yorumunuz gönderildi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 5 * 1000
                })
            }

            this.props.hideWriteReviewPopup()
        }).catch((err) => {
            this.props.hideWriteReviewPopup()
        })
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideWriteReviewPopup()
    }

    onCloseClick = (event) => {
        this.props.hideWriteReviewPopup()
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onAgreementChange = (event) => {
        this.setState({ isAgreementChecked: event.target.checked })
    }

    render() {
        const {
            title,
            comment,
            ownerAlias,
            email,
            isAgreementChecked
        } = this.state


        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12 p-5'>
                    <h4 className='text-black'>Flormar Perfect Coverage Liquid Concealer Kapatıcı 004 Medium Beige hakkındaki Yorumum</h4>
                    <br />
                    <form autoComplete='off' action='' onSubmit={this.onSubmitForm}>

                        <div className='form-group row border-top border-bottom py-4'>
                            <div className='col-md-6 d-flex align-items-center'>
                                <span className='text-black font-weight-bold'>Genel Derecelendirme <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <IoIosStar size={32} color='orange' />
                                <IoIosStarHalf size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='title' className='text-black'>Yorum Başlığı <span className='text-danger'>*</span></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='title'
                                    name='title'
                                    onChange={this.onChange}
                                    value={title} />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='comment' className='text-black'>Yorum <span className='text-danger'>*</span></label>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    id='comment'
                                    name='comment'
                                    onChange={this.onChange}
                                    rows={4}
                                    value={comment} />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label htmlFor='ownerAlias' className='text-black'>Takma Ad <span className='text-danger'>*</span></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='ownerAlias'
                                    name='ownerAlias'
                                    placeholder='Diğer kullanıcıların gördüğü'
                                    onChange={this.onChange}
                                    value={ownerAlias} />
                            </div>

                            <div className='col-md-6'>
                                <label htmlFor='email' className='text-black'>E-Posta <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onEmailChange}
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    onChange={this.onChange}
                                    value={email} />
                            </div>
                        </div>

                        <div className='form-group row border-top border-bottom py-4'>
                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <span className='text-black font-weight-bold'>Bu ürünün kalitesi için nasıl bir değerlendirme yaparsınız? <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <IoIosStar size={32} color='orange' />
                                <IoIosStarHalf size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                            </div>
                        </div>

                        <div className='form-group row border-bottom pb-4'>
                            <div className='col-md-6 d-flex align-items-center'>
                                <span className='text-black font-weight-bold'>Bu ürünün, fiyatının karşılığı ne kadar verdiğini nasıl değerlendirirsiniz? <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <IoIosStar size={32} color='orange' />
                                <IoIosStarHalf size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                                <IoIosStarOutline size={32} color='orange' />
                            </div>
                        </div>

                        <div className='flex-row d-flex justify-content-between'>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='checkbox' checked={this.state.isAgreementChecked} onChange={this.onAgreementChange} style={{ width: 24, height: 24, cursor: 'pointer' }} />
                                <label className='form-check-label  ml-2'>
                                    <span onClick={this.showPreInfoPopup} className='text-primary' style={{ cursor: 'pointer' }}>Şartlar ve koşulları</span> kabul ediyorum.
                                </label>
                            </div>

                            <button
                                onClick={this.onConfirm}
                                className='btn px-4 py-2 text-white'
                                disabled={!this.state.isAgreementChecked}
                                style={{ backgroundColor: '#EE4266', borderRadius: '.25rem', cursor: 'pointer' }}>Yorumu Gönder</button>
                        </div>

                    </form>
                </div>
            </PopupWrapper>
        )
    }
}

export default WriteReviewPopup