import React from 'react'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

class ProfileColumn extends React.PureComponent {
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
                    <li>
                        <a style={{ fontWeight: 400 }} href='/edit-profile'>Profilimi Düzenle</a>
                    </li>
                    <li className='mt-1'>
                        <a style={{ fontWeight: 400 }} href='/update-password'>Şifremi Değiştir</a>
                    </li>
                    <li className='mt-1'>
                        <a style={{ fontWeight: 400 }} href='/favorite-products'>Favori Ürünlerim</a>
                    </li>
                    <li className='mt-1'>
                        <a style={{ fontWeight: 400 }} href='/previous-orders'>Siparişlerim</a>
                    </li>
                    <li className='mt-1'>
                        <span style={{ color: '#007bff', cursor: 'pointer', fontWeight: 400 }} onClick={this.onLogoutClick}>Çıkış Yap</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProfileColumn
