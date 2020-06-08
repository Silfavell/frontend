import React from 'react'

class EmptyAddressCard extends React.Component {
    render() {
        return (
            <div className='col-md-12 mb-4 d-flex align-items-center justify-content-center border' style={{
                border: this.props.selected ? '3px solid #80DF80' : '1px solid #dee2e6',
                padding: 4,
                cursor: 'pointer',
                minHeight: 100
            }}
                onClick={this.props.showSaveAddressPopup}>
                <span className='text-primary h6'>Yeni Adres Ekle</span>
            </div>
        )
    }
}

export default EmptyAddressCard