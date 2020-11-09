import React from 'react'
import NumberFormat from 'react-number-format'

import NumberFormat from 'react-number-format'

import KvkkAgreement from './KvkkAgreement'
import MembershipAgreement from './MembershipAgreement'
import KvkkAgreement from './KvkkAgreement'

const SignUpSection = ({
  state,
  onInputChange,
  onPhoneChange,
  sendActivationCode,
  showAgreementPopup,
  hideAgreementPopup,
  showKvkkAgreementPopup,
  hideKvkkAgreementPopup
}) => {
    const {
        phoneNumber,
        nameSurname,
        email,
        password
        // rePassword
    } = state

    return (
        <div id='register' className='p-3 p-lg-5'>
            {
                state.showAgreementPopup && <MembershipAgreement hidePopup={hideAgreementPopup} />
            }

            {
                state.showKvkkAgreementPopup && <KvkkAgreement hidePopup={hideKvkkAgreementPopup} />
            }

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='nameSurname' className='text-black'>
                        Adınız Soyadınız
                        <span className='text-danger'>*</span>
                    </label>
                    <input
                        onChange={onInputChange}
                        className='form-control'
                        id='nameSurname'
                        name='nameSurname'
                        autoComplete='name'
                        value={nameSurname}
                        placeholder='Adınız ve Soyadınızı giriniz' />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='c_email' className='text-black'>
                        E-Posta
                        <span className='text-danger'>*</span>
                    </label>
                    <input
                        onChange={onInputChange}
                        type='email'
                        className='form-control'
                        id='c_email'
                        autoComplete='Email'
                        name='email'
                        value={email}
                        placeholder='E-Posta adresinizi giriniz' />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='phoneNumber' className='text-black'>
                        Telefon Numarası
                        <span className='text-danger'>*</span>
                    </label>
                    <NumberFormat
                        type='tel'
                        className='form-control'
                        placeholder='Telefon Numaranızı giriniz'
                        onChange={onInputChange}
                        name='phoneNumber'
                        autoComplete='tel'
                        id='phone_number'
                        format='+90 (###) ### ## ##'
                        mask='_'
                        value={phoneNumber} />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='password' className='text-black'>
                        Şifre
                        <span className='text-danger'>*</span>
                    </label>
                    <input
                        onChange={onInputChange}
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        autoComplete='new-password'
                        placeholder='Şifrenizi giriniz'
                        value={password} />
                </div>
            </div>

            <div className='form-group row form-check'>
                <label
                    htmlFor='agreement'
                    className='form-check-label'>
                    Hesap oluşturarak
                    {' '}
                    <span
                        id='agreement'
                        className='text-primary agreement'
                        onClick={showAgreementPopup}>
                        Üyelik Sözleşmesini
                    </span>
                    {' '}
                    ve
                    {' '}
                    <span
                        id='kvkk'
                        className='text-primary agreement'
                        onClick={showKvkkAgreementPopup}>
                        KVKK Aydınlatma Metnini
                    </span>
                    {' '}
                    okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
                </label>
            </div>

            {
                /*
            <div className='form-group row form-check'>
                <div className='col-md-12'>
                    <input
                        type='checkbox'
                        className='form-check-input' id='dont-forget' name='dont-forget' placeholder='' />
                    <label
                        style={{ cursor: 'pointer', display: 'unset' }}
                        htmlFor='dont-forget'
                        className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                </div>
            </div>
        */
      }

      <div className='form-group row'>
        <div className='col-lg-12'>
          <button
            className='btn btn-primary btn-lg btn-block'
            onClick={sendActivationCode}
            disabled={!state.validationError?.includes('activationCode')}
          >Üye Ol</button>
        </div>
      </div>

    </div>
  )
}

export default SignUpSection