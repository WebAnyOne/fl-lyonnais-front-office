import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { generateKey } from './functionshelper'
import SearchContext from './SearchContext'
const queryString = require('query-string')

function DetailSkills(props) {
  const { updateSearch } = useContext(SearchContext)
  const history = useHistory()

  const handleTagClick = (tag) => {
    const urlQuery = queryString.stringify(
      {
        search: tag.name.split(' '),
      },
      { arrayFormat: 'index', skipNull: true }
    )
    const url = '/liste_freelance?' + urlQuery
    updateSearch(tag.name)
    history.push(url)
  }

  return (
    <>
      <section className="text-justify max-w-5xl pt-16 mx-auto container bg-white">
        <div className="flex flex-col items-center content-center justify-center h-auto bg-white w-70">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Compétences ({props.tags.length})
          </h1>
          <div className="px-6 flex items-center sm:flex-row justify-between flex-wrap">
            {props.tags.map((tag) => (
              <div
                key={generateKey(tag.id)}
                className="m-2 p-4 md:mb-0 bg-indigo-200 h-8 cursor-pointer rounded-full flex items-center justify-center hover:bg-indigo-600 text-xs  font-normal text-indigo-700 hover:text-white"
              >
                <span>
                  <p onClick={() => handleTagClick(tag)}>{tag.name}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default DetailSkills
