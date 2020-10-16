import React from 'react'

import SiteWrap from '../../components/SiteWrap/SiteWrap'

class NotFound extends React.PureComponent {
    render() {
        return (
            <SiteWrap>
                <div className='container d-flex align-items-center justify-content-center flex-column' style={{ height: 300 }}>
                    <h1 style={{ fontSize: 100, color: 'black' }}>404</h1>
                    <h1 style={{ fontSize: 24, color: '#505050', marginTop: 50 }}>Sayfa Bulunamadı</h1>
                </div>
            </SiteWrap>
        )
    }
}

export default NotFound