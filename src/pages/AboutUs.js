/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FirstImage from '../components/FirstImage'

class AboutUs extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <FirstImage />
                <div class='site-section'>
                    <div class='container'>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="p-3 p-lg-5 border">
                                            <div class='col-md-12'>
                                                <h2 class='h3 mb-3 text-black'>Silfavell Hakkında</h2>
                                            </div>

                                            <div class='col-md-12'>
                                                <p>
                                                    Doğuş Planet, e-ticaret sektöründe faaliyet göstermek üzere, Doğuş Grubu ile Güney Kore’nin en büyük gruplarından SK Group’un ortaklığında Haziran 2012’de kuruldu.
                                                </p>

                                                <p>
                                                    Doğuş Planet, SK Group’un teknoloji ve inovasyon konusundaki tecrübesini Doğuş Grubu’nun bilgi birikimi, bölgesel tecrübesi ve gücü ile birleştirmektedir.
                                                </p>

                                                <p>
                                                    Bu güçlü ortaklık çerçevesinde, Doğuş Planet e-ticaret yatırımı olarak, binlerce marka ve mağazayı milyonlarca müşteriyle buluşturan açık pazar platformu alışverişin uğurlu adresi “n11.com”u açtı.
                                                </p>

                                                <p>
                                                    n11.com; elektronikten tekstile, mutfak gereçlerinden Türkiye’nin nadide el sanatlarına kadar farklı ihtiyaç ve zevklere hitap eden milyonlarca ürün, alışveriş yaptıkça kazandıran yapısı ile üyelerine yeni bir alışveriş deneyimi sunuyor. n11.com, müşteriler tarafında güven ve kolaylık, mağazalar tarafında ise işbirliği ve e-ticareti geliştirme odaklı bir yaklaşım izlemektedir.
                                                </p>

                                                <p>
                                                    Siz de alışverişin uğurlu dünyasına katılabilir, milyonlarca ürün ve binlerce mağazanın olduğu n11.com’da, avantaj dolu alışverişin keyfini çıkartabilirsiniz.
                                                </p>

                                                <p>
                                                    Uğurlu alışverişler.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-5 ml-auto">
                                        <div class='p-4 border mb-3'>
                                            <span class='d-block text-primary h6 text-uppercase'>Vizyonumuz</span>
                                            <p class='mb-0'>
                                                Türkiye’de ve bölgede e-ticaret sektörünün lideri olmak.
                                            </p>
                                        </div>
                                        <div class='p-4 border mb-3'>
                                            <span class='d-block text-primary h6 text-uppercase'>Misyonumuz</span>
                                            <p class='mb-0'>
                                                E-ticaret sektöründe hem müşterilere hem mağazalara yenilikçi hizmetler sunarak Türkiye e-ticaret sektörünün yeniden şekillendirilmesine öncülük etmek.
                                            </p>
                                        </div>
                                        <div class='p-4 border mb-3'>
                                            <span class='d-block text-primary h6 text-uppercase'>Stratejimiz</span>
                                            <p class='mb-0'>
                                                Stratejik ortaklıklarla güçlü entegrasyona dayanan eko-sistemimizde, müşterilere Güven ve Kolaylık; mağazalara ise Destek ve Özen üzerine dayalı değer önerileri sunmaktır.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default AboutUs