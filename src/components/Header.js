import React, { useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import AuthContext from './AuthContext'
import EditionContext from './EditionContext'
import SearchContext from './SearchContext'
const queryString = require('query-string')

export default function PrimarySearchAppBar() {
  const { search, updateSearch } = useContext(SearchContext)
  const { freelanceId } = useContext(EditionContext)
  const history = useHistory()
  const Logo = '/logo.svg'
  function toggleMenu(flag) {
    let value = document.getElementById('menu')
    if (flag) {
      value.classList.remove('hidden')
    } else {
      value.classList.add('hidden')
    }
  }

  const syncUrlWithSearch = (search) => {
    const urlQuery = queryString.stringify(
      {
        search: search.length ? search.split(/\W+/) : null,
        page: 1,
      },
      { arrayFormat: 'index', skipNull: true }
    )
    history.push('/liste_freelance?' + urlQuery)
  }

  const handleSearchInputChange = (e) => {
    updateSearch(e.target.value)
    syncUrlWithSearch(e.target.value)
  }

  useEffect(() => {
    const searchParams = queryString.parse(window.location.search, {
      arrayFormat: 'index',
      skipNull: true,
    })
    if (searchParams.search) updateSearch(searchParams.search.join(' '))
  }, [window.location.search])

  const setTokenInLocalStorage = useContext(AuthContext).setToken
  const setUserInLocalStorage = useContext(AuthContext).saveUser
  const isConnected = !!useContext(AuthContext).token
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    setUserInLocalStorage('{}')
    setTokenInLocalStorage('')
  }

  return (
    <>
      <nav className="w-full bg-gray-100">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div>
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>

          <section className="flex items-center justify-center h-20">
            <form
              action="#"
              className="flex items-center justify-center w-1/2"
              role="search"
              aria-label="Sitewide"
            >
              <label htmlFor="search" className="sr-only">
                Search this site
              </label>
              <input
                type="text"
                id="search"
                placeholder="Recherche"
                spellCheck="false"
                className="px-6 py-2 -mr-8 font-sans transition-colors duration-300 transform bg-gray-200 border-none rounded-full focus:outline-none focus:bg-gray-300"
                value={search}
                onChange={handleSearchInputChange}
              />

              <button className="transform border-none" aria-label="Submit">
                <svg
                  className="text-gray-500 duration-200 fill-current hover:text-gray-700 focus:text-gray-700"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <title>magnifying-glass</title>
                  <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z" />
                </svg>
              </button>
            </form>
          </section>

          <div>
            <div
              onClick={() => toggleMenu(true)}
              className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
            >
              <svg
                aria-haspopup="true"
                aria-label="Main Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden icon icon-tabler icon-tabler-menu"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={4} y1={8} x2={20} y2={8} />
                <line x1={4} y1={16} x2={20} y2={16} />
              </svg>
            </div>
            <div id="menu" className="md:block lg:block hidden">
              <div
                onClick={() => toggleMenu(false)}
                className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none z-30 top-0 pt-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
              <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
                <Link to="/">
                  <li className="text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                    Accueil
                  </li>
                </Link>
                <Link to="/liste_freelance">
                  <li className="text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                    Freelances
                  </li>
                </Link>

                {isConnected && (user.freelance_id || freelanceId) && (
                  <Link
                    to={
                      user.freelance_id
                        ? `/detail/${user.freelance_id}`
                        : `/detail/${freelanceId}`
                    }
                  >
                    <li className="text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                      Mon Compte
                    </li>
                  </Link>
                )}

                {!isConnected && (
                  <Link to="/inscription">
                    <li className="text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                      Inscription
                    </li>
                  </Link>
                )}
                {isConnected && (
                  <Link
                    className="md:hidden text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10"
                    onClick={handleLogout}
                    to="/connexion"
                  >
                    Déconnexion
                  </Link>
                )}
                {!isConnected && (
                  <Link
                    className="md:hidden text-gray-800 hover:text-gray-900 cursor-pointer lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10"
                    to="/connexion"
                  >
                    Connexion
                  </Link>
                )}
              </ul>
            </div>
          </div>
          {isConnected && (
            <Link
              className="focus:outline-none hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
              onClick={handleLogout}
              to="/connexion"
            >
              Déconnexion
            </Link>
          )}
          {!isConnected && (
            <Link
              className="focus:outline-none hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
              to="/connexion"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
