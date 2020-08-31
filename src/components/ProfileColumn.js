import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class ProfileColumn extends React.Component {
    onLogoutClick = () => {
        cookies.remove('token', { path: '/' })
        cookies.remove('user', { path: '/' })
        localStorage.removeItem('_id')
        localStorage.removeItem('alias')
        localStorage.removeItem('favoriteProducts')
        window.location.reload()
    }

    render() {
        return (
            <div className='col-md-3 my-2'>
                <ul className='column-dropdown border h-100'>
                    <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
                    <li><a href='/update-password'>Şifremi Değiştir</a></li>
                    <li><a href='/favorite-products'>Favori Ürünlerim</a></li>
                    <li><a href='/previous-orders'>Siparişlerim</a></li>
                    <li><span style={{ color: '#007bff', cursor: 'pointer' }} onClick={this.onLogoutClick}>Çıkış Yap</span></li>
                </ul>
            </div>
        )
    }
}

export default ProfileColumn