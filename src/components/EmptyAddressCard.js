import React from 'react'

class EmptyAddressCard extends React.Component {
    render() {
        return (
            <div className='col-md-12'>
                <div className='form-group row' onClick={this.props.showSaveAddressPopup}>
                    <div className='ml-auto'>
                        <button className='btn btn-primary btn-lg btn-block' onClick={this.showCardPopup}>Yeni bir adres ekle</button>
                    </div>
                </div>
            </div>


        )
    }
}

export default EmptyAddressCard