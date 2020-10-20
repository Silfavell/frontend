import React from 'react'

class EmptyShop extends React.PureComponent {
  render() {
    return (
      <div className='container d-flex align-items-center justify-content-center flex-column' style={{ height: 300 }}>
        <h2 className={'text-black'} style={{ textAlign: 'center' }}>Ürün bulunmamaktadır</h2>
        <p className={'text-black'} style={{ fontSize: 18, marginTop: 32, textAlign: 'center' }}>Seçtiğiniz filtrelere uygun ürün bulunmamaktadır</p>
      </div>
    )
  }
}

export default EmptyShop