import React, { useState } from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Listing from './pages/Listing'
import Registration from './pages/Registration'
import LegalDisclaimer from './pages/LegalDisclaimer'
import SignIn from './pages/SignIn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Edition from './pages/Edition.js'
import Header from './components/Header'
import AuthContext from './components/AuthContext'
import EditionContextProvider from './components/EditionContextProvider'
import SearchContextProvider from './components/SearchContextProvider'
import Chat from './components/Chat'
import GeneralConditions from './pages/GeneralConditions'
import Information from './pages/Information'

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || '{}')
  )
  const setTokenInLocalStorage = (token) => {
    localStorage.setItem('authToken', token)
    setToken(token)
  }

  const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const reception_email =
    'Un e-mail de validation a été envoyé il faut cliquer sur le lien dans les 72h.'

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUser,
        token: token,
        saveToken: (token) => setTokenInLocalStorage(token),
        setToken: setTokenInLocalStorage,
      }}
    >
      <EditionContextProvider>
        <SearchContextProvider>
          <div className="App">
            <Router>
              <Header />
              <main style={{ flex: '1 0 auto' }}>
                <Switch>
                  <section className="max-w-8xl pt-16 mx-auto container bg-white">
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/detail/:id" component={Detail} />
                    <Route path="/liste_freelance" component={Listing} />
                    <Route path="/inscription">
                      <Registration />
                    </Route>
                    <Route path="/connexion">
                      <SignIn />
                    </Route>
                    <Route path="/compte">
                      <Edition />
                    </Route>
                    <Route path="/mentions_legales">
                      <LegalDisclaimer />
                    </Route>
                    <Route path="/reception_email">
                      <Information p={reception_email} />
                    </Route>
                    <Route path="/account_deleted">
                      <Information p={'Le compte a bien été supprimé'} />
                    </Route>
                    <Route path="/conditions_generales">
                      <GeneralConditions />
                    </Route>
                  </section>
                </Switch>
              </main>
              <Footer />
              <Chat />
            </Router>
          </div>
        </SearchContextProvider>
      </EditionContextProvider>
    </AuthContext.Provider>
  )
}

export default App
