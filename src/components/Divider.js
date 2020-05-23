import React from 'react'

class Divider extends React.Component {
    render() {
        return (
            <div className='bg-light py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mb-0'><a href='index.html'>Home</a> <span className='mx-2 mb-0'>/</span> <a href='shop.html'>Shop</a> <span className='mx-2 mb-0'>/</span> <strong className='text-black'>Gray Shoe</strong></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Divider