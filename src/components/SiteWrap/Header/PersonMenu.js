/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class PersonMenu extends React.PureComponent {
  onLogoutClick = () => {
    cookies.remove('token', { path: '/' })
    cookies.remove('user', { path: '/' })
    localStorage.removeItem('_id')
    localStorage.removeItem('alias')
    localStorage.removeItem('favoriteProducts')
    window.location.reload()
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <ul className='dropdown-test'>
          <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
          <li><a href='/favorite-products'>Favorilerim</a></li>
          <li><a href='/previous-orders'>Siparişlerim</a></li>
          <li><div onClick={this.onLogoutClick}>Çıkış Yap</div></li>
        </ul>
      )
    }

    return (
      <ul className='dropdown-test'>
        <li><a href='/sign-in'>Giriş yap</a></li>
        <li><a href='/sign-up'>Üye Ol</a></li>
      </ul>
    )
  }
}

export default PersonMenu