import React from 'react'

class AccordionHeader extends React.PureComponent {
    render() {
        return (
            <div className='card-header p-0 bg-white' id={`heading${this.props.id}`}>
                <h5 className='mb-0'>
                    <button
                        className='btn btn-link w-100 mx-3'
                        style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                        data-toggle='collapse'
                        data-target={`#collapse${this.props.id}`}
                        aria-expanded='true'
                        aria-controls={`collapse${this.props.id}`}
                    >
                        {this.props.title}
                    </button>
                </h5>
            </div>
        )
    }
}

export default AccordionHeader
