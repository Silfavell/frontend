import React from 'react'

import SiteWrapHoc from '../SiteWrap/SiteWrap'

class Loading extends React.PureComponent {
    render() {
        return (
            <div className='container d-flex align-items-center justify-content-center' style={{ height: '70vh' }}>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
        )
    }
}

export default SiteWrapHoc(Loading)