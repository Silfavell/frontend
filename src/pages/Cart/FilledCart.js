import React from 'react'

import CartItem from '../../components/CartItem/CartItem'

class FilledCart extends React.Component {
  onCheckoutClick = () => {
      this.props.history.push('/payment')
  }

  render() {
      const {
          products, onIncreaseClick, onDecreaseClick, setProductQuantity
      } = this.props

      const totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity, 0).toFixed(2)
      const cargoPrice = totalPrice < 85 ? 15 : 0

      return (
          <div className='container'>
              <div className='row mb-5'>
                  <div className='col-md-8'>
                      <div className='site-blocks-table'>
                          <table className='table border'>
                              <tbody>
                                  {
                                      products.map((product) => (
                                          <CartItem
                                              key={`${product._id}:${product.quantity}`}
                                              item={product}
                                              onIncreaseClick={onIncreaseClick}
                                              onDecreaseClick={onDecreaseClick}
                                              setProductQuantity={setProductQuantity} />

                                      ))
                                  }
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className='col-md-4'>
                      <div className='col-md-12 border p-4'>
                          <div className='row'>
                              <div className='col-md-12 text-left mb-5'>
                                  <h3 className='text-black h4 text-uppercase'>Sepet tutarı</h3>
                              </div>
                          </div>
                          <div className='row'>
                              <div className='col-6'>
                                  <span className='text-black'>Tutar</span>
                              </div>
                              <div className='col-6 text-right'>
                                  <strong className='text-black'>{`₺${totalPrice}`}</strong>
                              </div>
                          </div>
                          <div className='row'>
                              <div className='col-6'>
                                  <span className='text-black'>Kargo Ücreti</span>
                              </div>
                              <div className='col-6 text-right'>
                                  <strong className='text-black'>{`₺${cargoPrice.toFixed(2)}`}</strong>
                              </div>
                          </div>
                          <div className='row pt-4'>
                              <div className='col-6'>
                                  <span className='text-black'>Toplam</span>
                              </div>
                              <div className='col-6 text-right'>
                                  <strong className='text-black'>{`₺${(parseFloat(totalPrice) + parseFloat(cargoPrice)).toFixed(2)}`}</strong>
                              </div>
                          </div>
                      </div>

                      <div className='row pt-3'>
                          <div className='col-md-12'>
                              <button className='btn btn-primary btn-lg btn-block' onClick={this.onCheckoutClick}>Ödemeye Geç</button>
                          </div>
                      </div>
                  </div>
              </div>

              <div className='row'>
                  <div className='col-md-6'>
                      {
                          //  <div className='row mb-5'>
                          //      <div className='col-md-6 mb-3 mb-md-0'>
                          //          <button className='btn btn-primary btn-sm btn-block'>Update Cart</button>
                          //      </div>
                          //      <div className='col-md-6'>
                          //          <a href='/shop'>
                          //              <button className='btn btn-outline-primary btn-sm btn-block'>Continue Shopping</button>
                          //          </a>
                          //      </div>
                          //  </div>
                      }
                      {
                          //  <div className='row'>
                          //      <div className='col-md-12'>
                          //          <label className='text-black h4' htmlFor='coupon'>Kupon</label>
                          //          <p>Indirim kodunuz varsa giriniz</p>
                          //      </div>
                          //      <div className='col-md-8 mb-3 mb-md-0'>
                          //          <input type='text' className='form-control py-3' id='coupon' placeholder='Indirim kuponu' />
                          //      </div>
                          //      <div className='col-md-4'>
                          //          <button className='btn btn-primary btn-sm px-4'>Kuponu kullan</button>
                          //      </div>
                          //  </div>
                      }
                  </div>
              </div>
          </div>
      )
  }
}

export default FilledCart
