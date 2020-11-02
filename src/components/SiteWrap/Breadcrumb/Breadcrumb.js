import React from 'react'

class Breadcrumb extends React.PureComponent {
    render() {
        return (
            <div className='bg-light py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mb-0'>
                            <a href={`/`} className='text-capitalize'>{'Ana sayfa'}</a>
                            {
                                this.props.breadcrumb.map((crumb, index) => {
                                    if (crumb.path) {
                                        return (
                                            <React.Fragment key={'crumb' + index}>
                                                <span className='mx-2 mb-0'>/</span>
                                                <a href={crumb.path} className='text-capitalize'>{crumb.title}</a>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return (
                                            <React.Fragment key={'crumb' + index}>
                                                <span className='mx-2 mb-0'>/</span>
                                                <strong className='text-capitalize text-black'>{crumb.title}</strong>
                                            </React.Fragment>
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

export default Breadcrumb