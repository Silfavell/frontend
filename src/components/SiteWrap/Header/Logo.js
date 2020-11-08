/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

class Logo extends React.PureComponent {
    render() {
        return (
            <div className='logo flex-grow-1 d-flex align-items-center justify-content-center'>
                <a href='/' className='js-logo-clone'>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} style={{ height: 80 }} />
                </a>
            </div>
        )
    }
}

export default Logo
