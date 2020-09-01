import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

import PopupWrapper from '../PopupWrapper'
import Rate from './Rate'

class WriteReviewPopup extends React.Component {

    state = {
        title: '',
        comment: '',
        ownerAlias: '',
        isAgreementChecked: false
    }

    onConfirm = () => {
        const {
            title,
            comment,
            ownerAlias
        } = this.state

        if (
            title.trim().length > 0 &&
            comment.trim().length >= 30 &&
            this.generalRateRef.state.rate > 0 &&
            this.qualityRateRef.state.rate > 0 &&
            this.priceRateRef.state.rate > 0 &&
            (localStorage.getItem('alias') || ownerAlias.trim().length > 0)) {
            axios.post(`${process.env.REACT_APP_API_URL}/user/save-comment`, {
                productId: this.props.productId,
                title,
                comment,
                ownerAlias,
                generalRate: this.generalRateRef.state.rate,
                qualityRate: this.qualityRateRef.state.rate,
                priceRate: this.priceRateRef.state.rate
            }).then(({ data, status }) => {
                if (status === 200) {
                    VanillaToasts.create({
                        title: `Yorumunuz gönderildi`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 5 * 1000
                    })

                    if (ownerAlias.length > 0) {
                        localStorage.setItem('alias', ownerAlias)
                    }
                }

                this.props.hideWriteReviewPopup(data)
            }).catch((err) => {
                this.props.hideWriteReviewPopup()
            })
        } else {
            VanillaToasts.create({
                title: `Lütfen gerekli alanlarını doldurunuz`,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        }
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

    onGeneralRateRef = (ref) => {
        this.generalRateRef = ref
    }

    onQualityRateRef = (ref) => {
        this.qualityRateRef = ref
    }

    onPriceRateRef = (ref) => {
        this.priceRateRef = ref
    }

    render() {
        const {
            title,
            comment,
            ownerAlias,
            isAgreementChecked
        } = this.state


        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12 p-5'>
                    <h4 className='text-black'>Flormar Perfect Coverage Liquid Concealer Kapatıcı 004 Medium Beige hakkındaki Yorumum</h4>
                    <br />
                    <div>

                        <div className='form-group row border-top border-bottom py-4'>
                            <div className='col-md-6 d-flex align-items-center'>
                                <span className='text-black font-weight-bold'>Genel Derecelendirme <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <Rate ref={this.onGeneralRateRef} />
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
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor='title' className='text-black'>Yorum <span className='text-danger'>*</span></label>
                                    {
                                        comment.length < 30 && (
                                            <span style={{ color: 'red' }}>{`En az 30 karakter (${comment.length})`}</span>
                                        )
                                    }
                                </div>
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

                        {
                            !localStorage.getItem('alias') && (
                                <div className='form-group row'>
                                    <div className='col-md-12'>
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
                                </div>
                            )
                        }

                        <div className='form-group row border-top border-bottom py-4'>
                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <span className='text-black font-weight-bold'>Bu ürünün kalitesi için nasıl bir değerlendirme yaparsınız? <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <Rate ref={this.onQualityRateRef} />
                            </div>
                        </div>

                        <div className='form-group row border-bottom pb-4'>
                            <div className='col-md-6 d-flex align-items-center'>
                                <span className='text-black font-weight-bold'>Bu ürünün, fiyatının karşılığı ne kadar verdiğini nasıl değerlendirirsiniz? <span className='text-danger'>*</span></span>
                            </div>

                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                <Rate ref={this.onPriceRateRef} />
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
                                disabled={!isAgreementChecked}
                                style={{ backgroundColor: '#EE4266', borderRadius: '.25rem', cursor: 'pointer' }}>Yorumu Gönder</button>
                        </div>

                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default WriteReviewPopup