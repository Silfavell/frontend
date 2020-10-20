import React from 'react'

import SiteWrap from '../SiteWrap/SiteWrap'

class Loading extends React.PureComponent {
    render() {
        return (
            <SiteWrap>
                <div className='container d-flex align-items-center justify-content-center' style={{ height: '70vh' }}>
                    <div className='spinner-grow text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default Loading