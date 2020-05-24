import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ShopSingle from './pages/ShopSingle'
import AboutUs from './pages/AboutUs'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route exact path='/contact'><Contact /></Route>
                    <Route exact path='/about-us'><AboutUs /></Route>
                    <Route exact path='/shop'><Shop /></Route>
                    <Route exact path='/sign-in'><SignIn /></Route>
                    <Route exact path='/sign-up'><SignUp /></Route>
                    <Route exact path='/cart'><Cart /></Route>
                    <Route exact path='/:_id'><ShopSingle /></Route>
                </Switch>
            </Router>
        )
    }
}

export default App