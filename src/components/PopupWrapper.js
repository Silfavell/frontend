import React from 'react'

class PopupWrapper extends React.Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} onClick={this.props.onOutsideClick}>
                <div style={{ backgroundColor: 'white', width: '50%' }}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default PopupWrapper