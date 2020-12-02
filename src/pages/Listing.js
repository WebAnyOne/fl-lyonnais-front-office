import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet'
import Freelance from '../components/Freelance'
import { useHistory } from 'react-router-dom'
import API from '../components/API'
import SearchContext from '../components/SearchContext'
import cx from 'classnames'
import { Link } from 'react-router-dom'
const queryString = require('query-string')
const title = 'Liste de freelances'

const Listing = (props) => {
  const [freelances, setFreelances] = useState([])
  const [totalFreelances, setTotalFreelances] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [freelancesPerPage] = useState(18)
  const pageNumbers = []
  const { search } = useContext(SearchContext)
  const history = useHistory()
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    const searchParams = queryString.parse(window.location.search, {
      arrayFormat: 'index',
      skipNull: true,
    })
    const urlQuery = queryString.stringify(
      {
        ...searchParams,
        page: pageNumber,
      },
      { arrayFormat: 'index', skipNull: true }
    )
    history.push('/liste_freelance?' + urlQuery)
  }

  useEffect(() => {
    const fetchFreelances = async () => {
      setLoading(true)
      const res = await API.get(
        '/freelances' +
          props.location.search +
          (!props.location.search ? '?' : '&') +
          'flperpage=' +
          freelancesPerPage
      )
      setFreelances(res.data.freelances)
      setTotalFreelances(res.data.freelanceTotalAmount)
      setLoading(false)
    }
    fetchFreelances()
  }, [props.location.search])

  const searchParams = queryString.parse(props.location.search, {
    arrayFormat: 'index',
    skipNull: true,
  })

  useEffect(() => {
    if (searchParams.page) setCurrentPage(parseInt(searchParams.page))
  }, [searchParams.page])

  if (totalFreelances >= freelancesPerPage) {
    for (let i = 1; i <= Math.ceil(totalFreelances / freelancesPerPage); i++) {
      pageNumbers.push(i)
    }
  }

  const paginationLinks = (
    <>
      {totalFreelances > 18 && (
        <div>
          <div className="max-w-8xl mx-auto container py-10">
            <ul className="flex justify-center items-center">
              <li>
                <span
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                  }
                  className="cursor-pointer p-1 flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold text-gray-500 hover:text-indigo-700 focus:outline-none mr-0.5 sm:mr-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </span>
              </li>
              {pageNumbers.map((number) => (
                <li>
                  <Link to={'/liste_freelance?page=' + number}>
                    <span
                      key={number}
                      onClick={() => paginate(number)}
                      className={cx(
                        'flex hover:bg-indigo-600 hover:text-white text-base leading-tight font-bold cursor-pointer shadow transition duration-150 ease-in-out mx-1 sm:mx-2 rounded px-3 py-2 focus:outline-none',
                        currentPage === number && 'bg-indigo-600 text-white'
                      )}
                    >
                      {number}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <span
                  onClick={() =>
                    paginate(
                      currentPage < pageNumbers.length
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                  className="cursor-pointer flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold text-gray-500 hover:text-indigo-700 p-1 focus:outline-none ml-0.5 sm:ml-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container flex justify-center mx-auto pt-16">
        <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
          Les Freelance Lyonnais
        </h1>
      </div>
      {paginationLinks}
      <div className="w-full px-10">
        {search && (
          <p>
            {totalFreelances} résultat(s) pour votre mot-clé "{search}".
          </p>
        )}
        <div className="container mx-auto">
          <div
            style={{ opacity: loading ? 0.5 : 1 }}
            className="lg:flex md:flex xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around pt-10"
          >
            {freelances.map((freelance) => (
              <Freelance
                key={freelance.id}
                id={freelance.id}
                firstname={freelance.firstname}
                lastname={freelance.lastname}
                urlPhoto={freelance.url_photo}
                job_title={freelance.job_title}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
      {paginationLinks}
    </>
  )
}

export default Listing
