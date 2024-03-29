/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import VanillaToasts from 'vanillatoasts'

import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import { postTicket } from '../../scripts/requests'

const initialState = {
    name: '',
    surname: '',
    email: '',
    subject: '',
    message: ''
}

class Contact extends React.Component {
  state = initialState

  onSendMessageClick = async () => {
      const {
          name,
          surname,
          email,
          subject,
          message
      } = this.state

      const { status } = await postTicket({
          name,
          surname,
          email,
          subject,
          message
      })

      if (status === 200) {
          VanillaToasts.create({
              title: `Mesajınız iletildi`,
              positionClass: 'topRight',
              type: 'success',
              timeout: 3 * 1000
          })

          this.setState(initialState)
      }
  }

  onChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }

  render() {
      const {
          name,
          surname,
          email,
          subject,
          message
      } = this.state

      return (
          <div className='container'>
              <div className='row'>
                  <div className='col-md-7 my-2'>

                      <div className='p-3 p-lg-5 border'>
                          <div className='form-group row'>
                              <div className='col-md-6'>
                                  <label htmlFor='name' className='text-black'>
                                      Adınız
                                      {' '}
                                      <span className='text-danger'>*</span>
                                  </label>
                                  <input type='text' className='form-control' id='name' name='name' placeholder='Adınızı giriniz' value={name} onChange={this.onChange} />
                              </div>
                              <div className='col-md-6'>
                                  <label htmlFor='surname' className='text-black'>
                                      Soyadınız
                                      {' '}
                                      <span className='text-danger'>*</span>
                                  </label>
                                  <input type='text' className='form-control' id='surname' name='surname' placeholder='Soyadınızı giriniz' value={surname} onChange={this.onChange} />
                              </div>
                          </div>
                          <div className='form-group row'>
                              <div className='col-md-12'>
                                  <label htmlFor='email' className='text-black'>
                                      E-Posta
                                      {' '}
                                      <span className='text-danger'>*</span>
                                  </label>
                                  <input type='email' className='form-control' id='email' name='email' placeholder='E-Posta adresinizi giriniz' value={email} onChange={this.onChange} />
                              </div>
                          </div>
                          <div className='form-group row'>
                              <div className='col-md-12'>
                                  <label htmlFor='subject' className='text-black'>
                                      Konu
                                      {' '}
                                      <span className='text-danger'>*</span>
                                      {' '}
                                  </label>
                                  <input type='text' className='form-control' id='subject' name='subject' placeholder='Mesajınızın konusunu giriniz' value={subject} onChange={this.onChange} />
                              </div>
                          </div>

                          <div className='form-group row'>
                              <div className='col-md-12'>
                                  <label htmlFor='message' className='text-black'>
                                      Mesajınız
                                      {' '}
                                      <span className='text-danger'>*</span>
                                      {' '}
                                  </label>
                                  <textarea name='message' id='message' cols='30' rows='7' placeholder='Mesajınızı giriniz..' className='form-control' value={message} onChange={this.onChange} />
                              </div>
                          </div>
                          <div className='form-group row'>
                              <div className='col-lg-12'>
                                  <button
                                      className='btn btn-primary btn-lg btn-block'
                                      onClick={this.onSendMessageClick}
                                      disabled={
                                          name.length === 0
                      || surname.length === 0
                      || email.length === 0
                      || subject.length === 0
                      || message.length === 0
                                      }>
                                      Mesajı Gönder

                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className='col-md-5 ml-auto my-2'>
                      <div className='p-4 border mb-3'>
                          <span className='d-block text-primary h6 text-uppercase'>İstanbul</span>
                          <p className='mb-0'>Yavuz Sultan Selim, Dr. Sadık Ahmet Cd. No:24, 34083 Fatih/İstanbul</p>
                      </div>
                  </div>

              </div>
          </div>
      )
  }
}

const breadcrumb = [
    { path: null, title: 'İletişim' }
]

export default SiteWrapHoc(Contact, { breadcrumb })
