import React from 'react'
//import InputMask from 'react-input-mask'
import { Formik } from 'formik'
import * as Yup from 'yup'

import MembershipAgreement from './MembershipAgreement'
import KvkkAgreement from './KvkkAgreement'

const SignUpSection = ({ state,
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
    password,
    // rePassword
  } = state

  const ValidationSchema = Yup.object().shape({
    nameSurname: Yup.string()
      .min(1, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .min(1, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .email('Must be an email address')
      .max(15, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(1, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required')
  })

  return (
    <div id={'register'} className='p-3 p-lg-5'>
      {
        state.showAgreementPopup && <MembershipAgreement hideAgreementPopup={hideAgreementPopup} />
      }

      {
        state.showKvkkAgreementPopup && <KvkkAgreement hideKvkkAgreementPopup={hideKvkkAgreementPopup} />
      }

      <Formik
        initialValues={{
          nameSurname: '',
          email: '',
          phoneNumber: '',
          password: ''
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resetForm()
            setSubmitting(false)
          }, 500)
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (

            <form onSubmit={handleSubmit}>
              <div className='form-group row'>
                <div className='col-md-12'>
                  <label htmlFor='nameSurname' className='text-black'>Adınız Soyadınız <span className='text-danger'>*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    id='nameSurname'
                    name='nameSurname'
                    placeholder='Adınız ve Soyadınızı giriniz'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nameSurname} />
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-12'>
                  <label htmlFor='c_email' className='text-black'>E-Posta <span className='text-danger'>*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    id='c_email'
                    name='email'
                    placeholder='E-Posta adresinizi giriniz'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email} />
                </div>
              </div>

              <div className='form-group row' autoComplete='off' action=''>
                <div className='col-md-12'>
                  <label htmlFor='phoneNumber' className='text-black'>Telefon Numarası <span className='text-danger'>*</span></label>
                  {
                /*
                 <InputMask
                    mask='\+\9\0 \(999\) 999 99 99'
                  >
                  </InputMask>
                  */}
                  <input
                    type='text'
                    className='form-control'
                    id='phone_number'
                    name='phoneNumber'
                    placeholder='Telefon Numaranızı giriniz'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                  />
                </div>
              </div>

              <div className='form-group row' autoComplete='off' action=''>
                <div className='col-md-12'>
                  <label htmlFor='password' className='text-black'>Şifre <span className='text-danger'>*</span></label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    placeholder='Şifrenizi giriniz'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password} />
                </div>
              </div>

              {
                /*
                    <div className='form-group row'>
                        <div className='col-md-12'>
                            <label htmlFor='repassword' className='text-black'>Şifre (repeat) <span className='text-danger'>*</span></label>
                            <input
                                onChange={onInputChange}
         
                                type='password'
                                className='form-control'
                                id='repassword'
                                name='repassword'
                                placeholder='Şifrenizi yeniden giriniz'
                                value={rePassword} />
                        </div>
                    </div>
                */
              }

              <div className='form-group row form-check'>
                <label
                  htmlFor='agreement'
                  className='form-check-label'>Hesap oluşturarak <span
                    id='agreement'
                    className='text-primary agreement'
                    onClick={showAgreementPopup}>Üyelik Sözleşmesini</span> ve <span
                      id='kvkk'
                      className='text-primary agreement'
                      onClick={showKvkkAgreementPopup}>KVKK Aydınlatma Metnini</span> okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.</label>
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
                    disabled={isSubmitting}
                  >Üye Ol</button>
                </div>
              </div>

            </form>
          )}
      </Formik>
    </div>
  )
}

export default SignUpSection