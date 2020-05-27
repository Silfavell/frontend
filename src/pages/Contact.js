/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

class Contact extends React.Component {

  onSendMessageClick = () => {
    alert('send message')
  }

  render() {
    return (
      <SiteWrap firstImage>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>

              <div className='p-3 p-lg-5 border'>
                <div className='form-group row'>
                  <div className='col-md-6'>
                    <label htmlFor='c_fname' className='text-black'>First Name <span className='text-danger'>*</span></label>
                    <input type='text' className='form-control' id='c_fname' name='c_fname' />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='c_lname' className='text-black'>Last Name <span className='text-danger'>*</span></label>
                    <input type='text' className='form-control' id='c_lname' name='c_lname' />
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-md-12'>
                    <label htmlFor='c_email' className='text-black'>Email <span className='text-danger'>*</span></label>
                    <input type='email' className='form-control' id='c_email' name='c_email' placeholder='' />
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-md-12'>
                    <label htmlFor='c_subject' className='text-black'>Subject </label>
                    <input type='text' className='form-control' id='c_subject' name='c_subject' />
                  </div>
                </div>

                <div className='form-group row'>
                  <div className='col-md-12'>
                    <label htmlFor='c_message' className='text-black'>Message </label>
                    <textarea name='c_message' id='c_message' cols='30' rows='7' className='form-control'></textarea>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-lg-12'>
                    <button className='btn btn-primary btn-lg btn-block' onClick={this.onSendMessageClick}>Send Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-5 ml-auto'>
              <div className='p-4 border mb-3'>
                <span className='d-block text-primary h6 text-uppercase'>New York</span>
                <p className='mb-0'>203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
              <div className='p-4 border mb-3'>
                <span className='d-block text-primary h6 text-uppercase'>London</span>
                <p className='mb-0'>203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
              <div className='p-4 border mb-3'>
                <span className='d-block text-primary h6 text-uppercase'>Canada</span>
                <p className='mb-0'>203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </div>
          </div>
        </div>
      </SiteWrap>
    )
  }
}

export default Contact
