import React from 'react'

class Divider extends React.Component {
    render() {
        return (
            <div className='bg-light py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mb-0'>
                            <a href={`/`} className='text-capitalize'>{'Ana sayfa'}</a>
                            {
                                this.props.divider.map((divider) => {
                                    if (divider.path) {
                                        return (
                                            <>
                                                <span className='mx-2 mb-0'>/</span>
                                                <a href={divider.path} className='text-capitalize'>{divider.title}</a>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <span className='mx-2 mb-0'>/</span>
                                                <strong className='text-capitalize text-black'>{divider.title}</strong>
                                            </>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Divider