import React from 'react'
import { IoIosAdd } from 'react-icons/io'

class EmptyAddressCart extends React.Component {
    render() {
        return (
            <div className='col-md-4 d-relative' style={{ padding: 4, cursor: 'pointer' }} onClick={this.props.showSaveAddressPopup}>
                <div style={{
                    minHeight: 120,
                    height: '100%',
                    flexDirection: 'column'
                }} className='d-flex align-items-center justify-content-center border'>
                    <IoIosAdd size={48} />
                    <span className='text-primary h6'>Yeni Adres Ekle</span>
                </div>
            </div>
        )
    }
}

export default EmptyAddressCart