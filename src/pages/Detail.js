import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import DetailBio from '../components/DetailBio'
import DetailSkills from '../components/DetailSkills'
import API from '../components/API'
import Buttons from '../components/Buttons'
import AuthContext from '../components/AuthContext'
import Carousel from '../components/Carousel'
import EditionContext from '../components/EditionContext'

function Detail(props) {
  const [freelance, setFreelance] = useState({})
  const [tags, setTags] = useState([])
  const [references, setReferences] = useState([])
  const [is_active, setIsActive] = useState()
  const { id } = useParams()
  const { freelanceId } = useContext(EditionContext)

  useEffect(() => {
    API.get('/freelances/' + id)
      .then((response) => response.data)
      .then((data) => {
        setFreelance(data.freelance)
        setTags(data.tags)
        setReferences(data.references)
        setIsActive(data.freelance.is_active)
      })
  }, [id])

  const { user } = useContext(AuthContext)
  return (
    <>
      <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
        {freelance.firstname} {freelance.lastname}
      </h1>
      {(is_active === 1 || is_active === 0) &&
        ((user && user.freelance_id == id) || freelanceId == id) && (
          <Buttons id={id} is_active={is_active} />
        )}
      <DetailBio freelances={freelance} />
      {tags.length > 0 && <DetailSkills tags={tags} freelances={freelance} />}
      {references.length !== 0 && <Carousel references={references} />}
    </>
  )
}

export default Detail
