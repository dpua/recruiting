import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './root.css';
import './index.css';
import App from './App';
import Logout from './components/Logout';
import PublicOffer from './pages/PublicOffer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Signup from './components/Signup';
import Login from './components/Login';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import ru from './lang/ru.json';
import en from './lang/en.json';
import uk from './lang/uk.json';
import SearchAPI from './pages/SearchAPI';
const store = createStore(reducer, applyMiddleware(thunk));
const defaultLocale = localStorage['locale'] ? localStorage['locale'] : 'en';
const localeList = [
    { name: 'English', code: 'en', lang: 'English' },
    { name: 'Русский', code: 'ru', lang: 'Russian' },
    { name: 'Український', code: 'uk', lang: 'Ukrainian' }
];
const messages = {
    en: en,
    ru: ru,
    uk: uk
}
class Menu extends Component {
    static defaultProps = {
        currentLocale: "[]"
    }
    state = {
        navtoggler: false,
        menu: ['home', 'search', 'search_api']
    }
    navToggler = () => {
        this.setState({ navtoggler: !this.state.navtoggler })
    }
    render() {
        return (
            <div className="main_header">
                <div className="main_header_content">
                    <div className="flex">
                        <Link className="logo" to={`/`} >
                            {/* <img src="./images/logo.svg" className="logo" alt="logo" /> */}
                            logo </Link>
                        <nav className={"b_menu" + (this.state.navtoggler ? ' active' : '')} >
                            {this.state.menu.map((e, i) => (
                                <Link key={i} className="menu" to={`/${e}`} onClick={this.navToggler.bind(this)}><FormattedMessage id={`menu_${e}`} /></Link>
                            ))}
                            {/* <Link  to={`/search`} >Search</Link> */}
                        </nav>
                    </div>
                    <div className="flex">
                        <div className="drop_menu">
                            <div className="drop_menu-current">
                                {this.props.currentLocale}
                                <span className="arrow">
                                    <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 477.2 252.2">
                                        <g>
                                            <path className="st0" d="M238.6,219.5L23.1,4C17.8-1.3,9.3-1.3,4,4s-5.3,13.8,0,19.1l225.1,225.1c5.3,5.3,13.8,5.3,19.1,0l225-225.1c2.6-2.6,4-6.1,4-9.5s-1.3-6.9-4-9.5c-5.3-5.3-13.8-5.3-19.1,0L238.6,219.5z"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <ul className="drop_menu-dropdown">
                                {
                                    localeList.map((locale, index) => (
                                        <li key={index} >
                                            <button lang={locale.code} onClick={this.props.onChangeLanguage} >{locale.name}</button></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <Logout />
                        <div className={"navtoggler menu" + (this.state.navtoggler ? ' active' : '')} onClick={this.navToggler.bind(this)} ><span></span><span></span><span></span></div>
                    </div>
                </div>
            </div>
        )
    }
}
class Content extends Component {
    render() {
        return (
            <main className="main">
                index page
            </main>
        )
    }
}
class Footer extends Component {
    render() {
        return (
            <footer>
                <Link to={`/public_offer`} >Public Offer</Link>
                <Link to={`/privacy_policy`} >Privacy Policy</Link>
                <p><FormattedMessage id="all_rights_reserved" /> 2022</p>
            </footer>
        )
    }
}
function SelectLocale() {
    console.log("defaultLocale: " + defaultLocale)
    const [currentLocale, setCurrentLocale] = useState(defaultLocale);
    console.log("currentLocale: " + currentLocale)
    localStorage.setItem('locale', currentLocale)
    const onChangeLanguage = (e) => {
        const selectedLocale = e.target.lang;
        setCurrentLocale(selectedLocale);
        localStorage.setItem('locale', selectedLocale)
    }
    return (
        <Provider store={store}>
            <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
                <BrowserRouter>
                    <App />
                    <Menu currentLocale={currentLocale} onChangeLanguage={onChangeLanguage} />
                    <main className="main">
                        <Route path="/" component={Content} exact />
                        <Route path="/home" component={Content} exact />
                        <Route path="/search" component={Search} />
                        <Route path="/search_api" component={SearchAPI} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/register" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/public_offer" component={PublicOffer} />
                        <Route path="/privacy_policy" component={PrivacyPolicy} />
                    </main>
                    <Footer />
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    )
}
ReactDOM.render(
    <SelectLocale />
    , document.getElementById('root')
);