import React from 'react'

class EmptyCart extends React.PureComponent {
  render() {
    return (
      <div className='container d-flex align-items-center justify-content-center flex-column' style={{ height: 300 }}>
        <h2 className={'text-black'}>Sepetiniz Boş</h2>
        <p className={'text-black'} style={{ fontSize: 18, marginTop: 32, textAlign: 'center' }}>Favori ürünlerinize veya size özel önerilerimize göz atarak alışverişe başlayabilirsiniz</p>
      </div>
    )
  }
}

export default EmptyCart