/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
    IoLogoAndroid,
    // IoLogoApple,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoTwitter
} from 'react-icons/io'
import {
    FaCcVisa,
    FaCcMastercard
} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='site-footer custom-border-top'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <h3 className='footer-heading mb-4' style={{ letterSpacing: '.1em' }}>-</h3>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FaCcMastercard size={64} color={'black'} className='mr-2' />
                            <FaCcVisa size={64} color={'black'} className='mr-2' />
                        </div>
                        <br/>
                        <a href="/sales-contract">Mesafeli Satış Sözleşmesi</a>
                        <br/>
                        <a href="/privacy-policy">Gizlilik Politikası</a>
                    </div>

                    <div className='col-lg-5 ml-auto mb-5 mb-lg-0'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 className='footer-heading mb-4' style={{ letterSpacing: '.1em' }}>Silfavell</h3>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>
                                    <li><a href='/about-us'>Hakkımızda</a></li>
                                    <li><a href='/contact'>İletişim</a></li>
                                </ul>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>
                                </ul>
                            </div>
                            <div className='col-md-6 col-lg-4'>
                                <ul className='list-unstyled'>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-3'>
                        <div className='block-5 mb-5'>
                            <h3 className='footer-heading mb-4' style={{ letterSpacing: '.1em' }}>UYGULAMAMIZI INDIRIN</h3>
                            <ul className='list-unstyled'>
                                {
                                    /*
                                        <li className='address'>203 Fake St. Mountain View, San Francisco, California, USA</li>
                                        <li className='phone'><a href='tel://23923929210'>+2 392 3929 210</a></li>
                                    */
                                }

                                <li className='d-flex align-items-center justify-content-start pl-0'>
                                    <a href='https://play.google.com/store/apps/details?id=com.silfavell.android' target='_blank' rel='noopener noreferrer'>
                                        <IoLogoAndroid size={32} color={'#EE4266'} className='mr-2' />
                                        Google Play
                                    </a>
                                </li>

                                {
                                    /*
                                        <li className='d-flex align-items-center justify-content-start pl-0'>
                                            <a href='https://play.google.com/store/apps/details?id=com.silfavell.android' target='_blank' rel='noopener noreferrer'>
                                                <IoLogoApple size={32} color={'#EE4266'} className='mr-2' />
                                                App Store
                                            </a>
                                        </li>
                                    */
                                }
                            </ul>
                            <h3 className='footer-heading my-4' style={{ letterSpacing: '.1em' }}>Bizi Takip Edin</h3>
                            <ul className='list-unstyled'>
                                {
                                    /*
                                        <li className='address'>203 Fake St. Mountain View, San Francisco, California, USA</li>
                                        <li className='phone'><a href='tel://23923929210'>+2 392 3929 210</a></li>
                                    */
                                }

                                <li className='d-flex align-items-center justify-content-start pl-0'>
                                    <a href='https://www.facebook.com/Silfavell-110326400716229' target='_blank' rel='noopener noreferrer'>
                                        <IoLogoFacebook size={32} color={'#EE4266'} className='mr-2' />
                                        Facebook
                                    </a>
                                </li>

                                <li className='d-flex align-items-center justify-content-start pl-0'>
                                    <a href='http://instagram.com/silfavell' target='_blank' rel='noopener noreferrer'>
                                        <IoLogoInstagram size={32} color={'#EE4266'} className='mr-2' />
                                        Instagram
                                    </a>
                                </li>

                                <li className='d-flex align-items-center justify-content-start pl-0'>
                                    <a href='https://twitter.com/silfavell' target='_blank' rel='noopener noreferrer'>
                                        <IoLogoTwitter size={32} color={'#EE4266'} className='mr-2' />
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='block-7'>
                            {
                                /*
                                <form action='#' method='post'>
                                    <label htmlFor='email_subscribe' className='footer-heading'>Subscribe</label>
                                    <div className='form-group'>
                                        <input type='text' className='form-control py-4' id='email_subscribe' placeholder='Email' />
                                        <input type='submit' className='btn btn-sm btn-primary' value='Send' />
                                    </div>
                                </form>
                                */
                            }
                        </div>
                    </div>
                </div>
                <div className='row pt-2 mt-2 text-center'>
                    <div className='col-md-12'>
                        <p>Copyright &copy; {new Date().getFullYear()}, Silfavell</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer