import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Divider from './Divider'
import FirstImage from './FirstImage'

class SiteWrap extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className='site-wrap'>
                <Navbar />
                <FirstImage />
                {
                    this.props.divider && <Divider />
                }
                {
                    this.props.children
                }
                <Footer />
            </div>
        )
    }
}

export default SiteWrap