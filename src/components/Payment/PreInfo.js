import React from 'react'

import PopupWrapper from '../PopupWrapper'

class MembershipAgreement extends React.Component {
    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hidePreInfoPopup()
    }

    onCloseClick = (event) => {
        this.props.hidePreInfoPopup()
    }

    render() {// TODO REVIEW
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12 d-flex'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='p-lg-5' style={{ whiteSpace: 'break-spaces' }}>
                                <h2 className='text-black text-center mb-5'>Ön Bilgilendirme Formu</h2>

                                <h5 className='text-black mb-5'>A - Satıcı Bilgileri ve Alıcı Bilgileri</h5>
                                <p><b className='text-black'>1 - Ünvan: Silfavell</b></p>
                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Adres: Levent Mahallesi, Yapı Kredi Plaza C Blok Cömert Sokak, 1 C Kat:1 34430 Beşiktaş/İstanbul
Telefon: 0 212 705 26 00
Faks: 0 212 284 22 78
Mersis No: 0411035618802101
Müşteri Hizmetleri: 0850 210 6 900
`
                                    }
                                </p>

                                <p><b className='text-black'>2 - Alıcı Adı Soyadı ve Adresi</b></p>
                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Teslim edilecek kişi: Muhammet İpek
Teslimat Adresi: Fatih/Istanbul
Telefon: 5468133198
E-Posta: muhammetipek57@hotmail.com
`
                                    }
                                </p>

                                <h5 className='text-black my-5'>B - Ürüne, Ürünün Satış Fiyatına ve Nakliyesine İlişkin Bilgiler</h5>
                                <p><b className='text-black'>3 - Ürün Bilgileri</b></p>

                                <table class='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Ürün Adı</th>
                                            <th scope='col'>Ürün Adeti</th>
                                            <th scope='col'>Toplam Tutar (KDV dahil)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'>Kargo Tutarı</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'>Toplam</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className='mt-5'><b className='text-black'>4 - Ödeme Yöntemi ve Ödeme Yöntemlerine İlişkin Bilgiler</b></p>

                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Ödeme Yöntemi : Kredi kartı
Kargo ücreti : 7.99 TL
Toplam Sipariş Bedeli : 56.74 TL
Konutta Ödeme
`
                                    }
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default MembershipAgreement