/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

import about1 from '../style/images/about_1.jpg'

function Footer() {
    return (
        <footer className='site-footer custom-border-top'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <h3 className='footer-heading mb-4'>Promo</h3>
                        <a href='#' className='block-6'>
                            <img src={about1} alt='Image placeholder' className='img-fluid rounded mb-4' />
                            <h3 className='font-weight-light  mb-0'>Finding Your Perfect Shirts This Summer</h3>
                            <p>Promo from  July 15 &mdash; 25, 2019</p>
                        </a>
                    </div>
                    <div className='col-lg-5 ml-auto mb-5 mb-lg-0'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 className='footer-heading mb-4'>Quick Links</h3>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>
                                    <li><a href='#'>Sell online</a></li>
                                    <li><a href='#'>Features</a></li>
                                    <li><a href='#'>Shopping cart</a></li>
                                    <li><a href='#'>Store builder</a></li>
                                </ul>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>
                                    <li><a href='#'>Mobile commerce</a></li>
                                    <li><a href='#'>Dropshipping</a></li>
                                    <li><a href='#'>Website development</a></li>
                                </ul>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>
                                    <li><a href='about-us'>Hakkımızda</a></li>
                                    <li><a href='contact'>İletişim</a></li>
                                    <li><a href='#'>Hardware</a></li>
                                    <li><a href='#'>Software</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-3'>
                        <div className='block-5 mb-5'>
                            <h3 className='footer-heading mb-4'>Contact Info</h3>
                            <ul className='list-unstyled'>
                                <li className='address'>203 Fake St. Mountain View, San Francisco, California, USA</li>
                                <li className='phone'><a href='tel://23923929210'>+2 392 3929 210</a></li>
                                <li className='email'>emailaddress@domain.com</li>
                            </ul>
                        </div>

                        <div className='block-7'>
                            <form action='#' method='post'>
                                <label htmlFor='email_subscribe' className='footer-heading'>Subscribe</label>
                                <div className='form-group'>
                                    <input type='text' className='form-control py-4' id='email_subscribe' placeholder='Email' />
                                    <input type='submit' className='btn btn-sm btn-primary' value='Send' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row pt-5 mt-5 text-center'>
                    <div class="col-md-12">
                        <p>Copyright &copy; {new Date().getFullYear()}, Silfavell Inc</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer