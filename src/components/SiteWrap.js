import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import Divider from './Divider'
import FirstImage from './FirstImage'

import '../style/css/style.css'

class SiteWrap extends React.Component {

    state = {
        isMobileMenuOpen: false
    }

    changeMobileMenuStatus = () => {
        this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
    }

    render() {
        return (
            <div className={`site-wrap ${this.state.isMobileMenuOpen ? 'offcanvas-menu' : ''}`} ref={this.props.siteRef} >
                <Navbar firstImage={this.props.firstImage} changeMobileMenuStatus={this.changeMobileMenuStatus} />
                {
                    this.props.firstImage && <FirstImage />
                }
                {
                    this.props.divider && <Divider divider={this.props.divider} />
                }
                <div className='site-section'>
                    {
                        this.props.children
                    }
                </div>
                <Footer />
            </div >
        )
    }
}

export default SiteWrap