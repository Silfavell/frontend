import React from 'react'

class AddressCart extends React.Component {

    onClick = () => {
        console.log('select address')
    }

    render() {
        const {
            openAddress,
            addressTitle,
            buildingNo,
            floor,
            aptNo
        } = this.props.item

        return (
            <div className="col-md-4 d-relative" style={{ padding: 4, cursor: 'pointer' }} onClick={this.onClick}>
                <div style={{ height: 180 }} className='border'>

                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '17px' }} className={'text-black px-3 pt-2'}>
                        <b>
                            {
                                addressTitle
                            }
                        </b>
                    </p>

                    <p style={{ lineHeight: '17px', maxHeight: 70, overflow: 'hidden' }} className={'text-black px-3'}>
                        <p>
                            {
                                openAddress
                            }
                        </p>
                    </p>

                </div>
            </div>
        )
    }
}

export default AddressCart