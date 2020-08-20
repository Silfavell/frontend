import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import axios from './utils/axios'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ShopSingle from './pages/ShopSingle'
import AboutUs from './pages/AboutUs'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import EditProfile from './pages/EditProfile'
import UpdatePassword from './pages/UpdatePassword'
import ForgotPassword from './pages/ForgotPassword'
import Payment from './pages/Payment'
import FavoriteProducts from './pages/FavoriteProducts'
import PreviousOrders from './pages/PreviousOrders'
import ReturnItems from './pages/ReturnItems'
import ReturnItemsCompleted from './pages/ReturnItemsCompleted'
import PaymentCompleted from './pages/PaymentCompleted'
import NotFound from './pages/NotFound'

axios()

class App extends React.Component {
    render() {
        return (
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
                    <Route path='/return-items-completed' component={ReturnItemsCompleted} />

                    <Route path='/update-password' component={UpdatePassword} />
                    <Route path='/forgot-password' component={ForgotPassword} />
                    <Route path='/:_id/p' component={ShopSingle} />
                    <Route exact path='*' component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App