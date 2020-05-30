/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import { IoMdPerson, IoIosBasket, IoMdMenu } from 'react-icons/io'
import Cookies from 'universal-cookie'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

class Navbar extends React.Component {

    state = {
        loggedIn: cookies.get('token'),
        productsLength: 0
    }

    UNSAFE_componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data }) => {
            this.setState({ productsLength: data ? Object.values(data).length : 0 })
        })
    }

    onLogoutClick = () => {
        cookies.remove('token')
        cookies.remove('user')
        this.setState({
            loggedIn: false
        })
    }

    renderPersonMenu = () => {
        if (this.state.loggedIn) {
            return (
                <ul className='dropdown'>
                    <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
                    <li><a href='/update-password'>Şifremi değiştir</a></li>
                    <li><div onClick={this.onLogoutClick}>Çıkış Yap</div></li>
                    {
                        /*
                            <li className='has-children'>
                                <a href='#'>Sub Menu</a>
                                <ul className='dropdown'>
                                    <li><a href='#'>Menu One</a></li>
                                    <li><a href='#'>Menu Two</a></li>
                                    <li><a href='#'>Menu Three</a></li>
                                </ul>
                            </li>
                        */
                    }
                </ul>
            )
        } else {
            return (
                <ul className='dropdown'>
                    <li><a href='/sign-in'>Giriş yap</a></li>
                    <li><a href='/sign-up'>Üye Ol</a></li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div className={`site-navbar bg-white py-2 ${!this.props.firstImage ? 'custom-border-bottom' : ''}`}>

                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='logo flex-grow-1 d-flex align-items-center justify-content-center'>
                            <a href='/' className='js-logo-clone'>
                                <img src={process.env.PUBLIC_URL + '/logo.png'} style={{ height: 80 }} />
                            </a>
                        </div>
                        <div className='main-nav d-none d-lg-block'>
                            <nav className='site-navigation text-right text-md-center' role='navigation'>
                                <ul className='site-menu js-clone-nav d-none d-lg-block'>

                                    <li className='has-children'>
                                        <a href='/shop'>Makyaj</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Göz</a></li>
                                            <li><a href='#'>Dudak</a></li>
                                            <li><a href='#'>Tırnak</a></li>
                                            <li><a href='#'>Yüz</a></li>
                                            <li><a href='#'>Makyaj Temizleme</a></li>
                                            <li><a href='#'>Makyaj Fırçaları</a></li>
                                            <li><a href='#'>Makyaj Aksesuarları</a></li>
                                            <li><a href='#'>Manikür & Pedikür</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>

                                    <li className='has-children'>
                                        <a href='/shop'>Cilt Bakım</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Yüz Bakımı</a></li>
                                            <li><a href='#'>Clit Nemlendirici Kremler</a></li>
                                            <li><a href='#'>Yüz Masker</a></li>
                                            <li><a href='#'>Yüz Serumları</a></li>
                                            <li><a href='#'>El & Vücut Bakımı</a></li>
                                            <li><a href='#'>Göz Bakımı</a></li>
                                            <li><a href='#'>Dudak Bakımı</a></li>
                                            <li><a href='#'>Epilasyon, Ağda & Tıraş</a></li>
                                            <li><a href='#'>Güneş Ürünleri</a></li>
                                            <li><a href='#'>Ayak Bakımı</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>


                                    <li className='has-children'>
                                        <a href='/shop'>Saç Bakım</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Şampuanlar</a></li>
                                            <li><a href='#'>Saç Kremleri</a></li>
                                            <li><a href='#'>Saç Şekillendirici</a></li>
                                            <li><a href='#'>Saç Bakım Ürünleri</a></li>
                                            <li><a href='#'>Fırça & Taraklar</a></li>
                                            <li><a href='#'>Saç Boyaları</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>

                                    <li className='has-children'>
                                        <a href='/shop'>Sağlık & Hijyen</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Ağız & Diş Bakımı</a></li>
                                            <li><a href='#'>Ayak Bakımı</a></li>
                                            <li><a href='#'>Duş & Banyo</a></li>
                                            <li><a href='#'>Sabunlar</a></li>
                                            <li><a href='#'>Cinsel Sağlık</a></li>
                                            <li><a href='#'>Hijyen</a></li>
                                            <li><a href='#'>Sağlık</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>

                                    <li className='has-children'>
                                        <a href='/shop'>Parfüm & Deodorant</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Erkek</a></li>
                                            <li><a href='#'>Kadın</a></li>
                                            <li><a href='#'>Kolonya</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>

                                    <li className='has-children'>
                                        <a href='/shop'>Erkek Bakım</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Erkek Tıraş Ürünleri</a></li>
                                            <li><a href='#'>Tıraş Bıçakları & Yedekleri</a></li>
                                            <li><a href='#'>Erkek Duş Jeli</a></li>
                                            <li><a href='#'>Erkek Cilt Bakım</a></li>
                                            <li><a href='#'>Sakal & Bıyık Bakımı</a></li>
                                            <li><a href='#'>Erkek Saç Boyası</a></li>
                                            <li><a href='#'>Aile Planlama & Cinsel Sağlık</a></li>
                                            <li><a href='#'>Saç Şekillendirici</a></li>
                                            <li><a href='#'>Erkek Şampuanı</a></li>
                                            <li><a href='#'>Erkek Parfüm</a></li>
                                            <li><a href='#'>Deodorant</a></li>
                                            <li><a href='#'>Popüler Markalar</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='icons flex-grow-1 d-flex align-items-center justify-content-center '>
                            <div className='site-navigation icon-dropdown'>
                                <div className='site-menu'>
                                    <li className='has-children'>
                                        <IoMdPerson size={26} />
                                        {
                                            this.renderPersonMenu()
                                        }
                                    </li>
                                    <li>
                                        <a href='/cart' className='icons-btn d-inline-block bag'>
                                            <IoIosBasket size={26} />
                                            <span className='number'>{this.state.productsLength}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none'>
                                            <IoMdMenu size={26} />
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar