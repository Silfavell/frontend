import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import AboutUs from './pages/AboutUs/AboutUs'
import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact/Contact'
import EditProfile from './pages/EditProfile/EditProfile'
import FavoriteProducts from './pages/FavoriteProducts/FavoriteProducts'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Payment from './pages/Payment/Payment'
import PaymentCompleted from './pages/PaymentCompleted/PaymentCompleted'
import PreviousOrders from './pages/PreviousOrders/PreviousOrders'
import ReturnItems from './pages/ReturnItems/ReturnItems'
import ReturnItemsCompleted from './pages/ReturnItemsCompleted/ReturnItemsCompleted'
import Shop from './pages/Shop/Shop'
import ShopSingle from './pages/ShopSingle/ShopSingle'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'
import axios from './scripts/axios'

import 'vanillatoasts/vanillatoasts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/css/googleMukta.css'
import './style/css/owl.theme.default.min.css'
import './style/css/style.css'

axios()

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />

                    <Route path='/contact' component={Contact} />
                    <Route path='/about-us' component={AboutUs} />
                    <Route path='/shop/:category/:subCategory' component={Shop} />
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/sign-up' component={SignUp} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/payment' component={Payment} />
                    <Route path='/payment-completed' component={PaymentCompleted} />
                    <Route path='/edit-profile' component={EditProfile} />

                    <Route path='/favorite-products' component={FavoriteProducts} />
                    <Route path='/previous-orders' component={PreviousOrders} />
                    <Route path='/return-items/:_id' component={ReturnItems} />
                    <Route path='/return-items-completed/:_id' component={ReturnItemsCompleted} />

                    <Route path='/update-password' component={UpdatePassword} />
                    <Route path='/forgot-password' component={ForgotPassword} />
                    <Route path='/:slug/p' component={ShopSingle} />
                    <Route exact path='*' component={NotFound} />
                </Switch>
            </Router>
        )
    }
}
export default App
