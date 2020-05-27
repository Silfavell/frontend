import React from 'react'

class AddressCart extends React.Component {
    render() {
        return (
            <div className="col-md-4 ml-auto d-relative" style={{ padding: 4 }}>
                <div style={{ height: 180 }} className='border'>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '17px' }} className={'text-black px-3 pt-2'}>
                        <b>
                            Ayvansaray Mah. bla bla Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tempore odio rem. Ut nemo saepe molestias inventore unde. Reiciendis assumenda pariatur recusandae eius! Molestiae explicabo, labore aspernatur hic officia dolores!
                        </b>
                    </p>

                    <p style={{ lineHeight: '17px', maxHeight: 70, overflow: 'hidden' }} className={'text-black px-3'}>
                        <p>
                            Ayvansaray Mah. bla bla Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tempore odio rem. Ut nemo saepe molestias inventore unde. Reiciendis assumenda pariatur recusandae eius! Molestiae explicabo, labore aspernatur hic officia dolores!
                        </p>
                    </p>

                </div>
            </div>
        )
    }
}

export default AddressCart