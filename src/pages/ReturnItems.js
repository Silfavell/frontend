import React from 'react'

import SiteWrap from '../components/SiteWrap'
import ProfileColumn from '../components/ProfileColumn'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

class ReturnItems extends React.Component {
    render() {
        const divider = [
            {
                path: null,
                title: 'İade'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className='row mb-5'>
                        <ProfileColumn />
                        <div className={`col-md-9 order-1 border`}>
                            <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
                                <p>
                                    Sitemizin bu bölümü yapım aşamasındadır. Lütfen ürün iadesi için <a href='/contact'>iletişim formunu</a> kullanarak sipariş tarihi, iade sebebi ve iade edilecek ürünleri iletiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default ReturnItems