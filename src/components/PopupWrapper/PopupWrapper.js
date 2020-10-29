import React from 'react'
import { IoIosClose } from 'react-icons/io'

class PopupWrapper extends React.PureComponent {
    render() {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} onClick={this.props.onOutsideClick}>
                <div
                    className={this.props.isSmall ? 'col-md-7' : 'col-md-5'}
                    style={{
                        backgroundColor: 'white',
                        maxHeight: '90%',
                        width: '100%',
                        position: 'relative',
                        overflow: 'auto'
                    }}>
                    <IoIosClose
                        onClick={this.props.onCloseClick}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 0,
                            cursor: 'pointer',
                            zIndex: 11
                        }}
                        size={32}
                        color={'black'}
                    />

                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}
export default PopupWrapper