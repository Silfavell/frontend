import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import ShopSingle from './pages/ShopSingle/ShopSingle'
import AboutUs from './pages/AboutUs/AboutUs'
import Shop from './pages/Shop/Shop'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Cart from './pages/Cart/Cart'
import EditProfile from './pages/EditProfile/EditProfile'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Payment from './pages/Payment/Payment'
import FavoriteProducts from './pages/FavoriteProducts/FavoriteProducts'
import PreviousOrders from './pages/PreviousOrders/PreviousOrders'
import ReturnItems from './pages/ReturnItems/ReturnItems'
import ReturnItemsCompleted from './pages/ReturnItemsCompleted/ReturnItemsCompleted'
import PaymentCompleted from './pages/PaymentCompleted/PaymentCompleted'
import NotFound from './pages/NotFound/NotFound'
import PaymentPopup from './pages/PaymentPopup/PaymentPopup'

import axios from './scripts/axios'
/*
import 'vanillatoasts/vanillatoasts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/css/googleMukta.css'
import './style/css/owl.theme.default.min.css'
import './style/css/style.css'

axios()
*/
class App extends React.PureComponent {
    render() {
        return (
            <div>
                <PaymentPopup></PaymentPopup>
            </div>
        )
    }
}
export default App
/*
<Router>
                <Switch>
                    <Route exact path='/' component={Home} />

                    <Route path='/contact' component={Contact} />
                    <Route path='/about-us' component={AboutUs} />
                    <Route path='/shop' component={Shop} />
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
                    <Route path='/:_id/p' component={ShopSingle} />
                    <Route exact path='*' component={NotFound} />
                </Switch>
            </Router>
*/