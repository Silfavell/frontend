import React from 'react'

class ProfileColumn extends React.Component {
    render() {
        return (
            <div className='col-md-3'>
                <ul className='column-dropdown border'>
                    <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
                    <li><a href='/update-password'>Şifremi değiştir</a></li>
                    <li><a href='/favorite-products'>Favorilerim</a></li>
                    <li><a href='/previous-orders'>Siparişlerim</a></li>
                </ul>
            </div>
        )
    }
}

export default ProfileColumn