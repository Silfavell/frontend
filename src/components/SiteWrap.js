import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import Divider from './Divider'
import FirstImage from './FirstImage'

import '../style/css/style.css'

class SiteWrap extends React.Component {
    render() {
        return (
            <div className='site-wrap'>
                <Navbar firstImage={this.props.firstImage} />
                {
                    this.props.firstImage && <FirstImage />
                }
                {
                    this.props.divider && <Divider />
                }
                <div className='site-section'>
                    {
                        this.props.children
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default SiteWrap