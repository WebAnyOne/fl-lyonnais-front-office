import React, { useState, useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import API from '../components/API'
import AuthContext from '../components/AuthContext'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Helmet } from 'react-helmet'

export default function SignIn() {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { saveToken, saveUser } = useContext(AuthContext)
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = { email, password }
    API.post('/users/connexion', payload)
      .then((res) => {
        saveToken(res.data.token)
        saveUser(res.data.user)
        history.push(
          status ? '/compte' : `/detail/${res.data.user.freelance_id}`
        )
      })
      .catch((err) => {
        console.error(err)
        handleClickOpen()
      })
  }

  const handleConnexionClick = (e) => {
    API.get('/users/')
  }

  const handleSubmitValidation = (event) => {
    event.preventDefault()
    const payload = { email }
    API.post('/users/renvoi_email_validation?email=' + email, payload)
      .then((res) => {})
      .catch((err) => {
        handleClickOpen()
      })
    history.push('/reception_email')
  }

  const location = useLocation()
  const search = location.search
  const status = search.toString().substr(8)
  const validation = {
    validated: '',
    revalidation: '',
    delayExceeded: '',
    wrongKey: '',
    displayForm: '',
  }
  let newFreelance = ''
  status ? (newFreelance = '') : (newFreelance = 'none')
  status === 'validated'
    ? (validation.validated = '')
    : (validation.validated = 'none')
  status === 'revalidation'
    ? (validation.revalidation = '')
    : (validation.revalidation = 'none')
  if (status === 'delay_exceeded') {
    validation.delayExceeded = ''
    validation.displayForm = 'none'
  } else {
    validation.delayExceeded = 'none'
  }
  if (status === 'wrong_key') {
    validation.wrongKey = ''
    validation.displayForm = 'none'
  } else {
    validation.wrongKey = 'none'
  }

  return (
    <>
      <div>
        <Helmet>
          <title>Connexion</title>
        </Helmet>
      </div>
      <div className="flex justify-center">
        <div style={{ display: `${newFreelance}` }} className="w-full sm:w-1/2">
          <h4 className="mb-6 text-2xl text-gray-800 font-bold">
            Information nouveau freelance
          </h4>

          <div style={{ display: `${validation.validated}` }}>
            <p className="mb-5 text-gray-800 text-xl">
              Féliciation, tu peux maintenant te connecter à ton compte.
            </p>
            <p className="mb-5 text-gray-800 text-xl">
              N'oublie pas de compléter ta page personnelle afin d'être plus
              visible.
            </p>
          </div>

          <div style={{ display: `${validation.revalidation}` }}>
            <p className="mb-5 text-gray-800 text-xl">
              Il semble que tu ais cliqué plusieurs fois de suite sur le lien
              pour valider ton adresse email.
            </p>
            <p className="mb-5 text-gray-800 text-xl">
              Pas de souci, tu peux te connecter à ton compte en utilisant le
              formulaire ci-dessous.
            </p>
            <p className="mb-5 text-gray-800 text-xl">
              N'oublie pas d'archiver ou d'effacer l'email...
            </p>
          </div>

          <div style={{ display: `${validation.delayExceeded}` }}>
            <p className="mb-5 text-gray-800 text-xl">
              Oups ! le délai de validation de 2 jours est dépassé !
            </p>
            <p className="mb-5 text-gray-800 text-xl">
              Pas de souci, en renseignant l'adresse email qui t'a servi pour
              créer ton compte et en cliquant sur le lien ci-dessous, tu vas
              recevoir un nouveau message auquel tu devras répondre dans le deux
              jours !
            </p>

            <form onSubmit={handleSubmitValidation}>
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="email"
                  className="text-left text-lg font-semibold leading-tight"
                >
                  Email
                </label>
                <input
                  required
                  name="email"
                  id="email"
                  className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <button
                className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                type="submit"
              >
                Envoyer de nouveau l'email de validation
              </button>
            </form>
          </div>

          <div style={{ display: `${validation.wrongKey}` }}>
            <p className="mb-5 text-gray-800 text-xl">
              Il semble qu'il y ait eu un petit souci lors de la validation.
            </p>
            <p className="mb-5 text-gray-800 text-xl">
              Tente de nouveau en cliquant sur le lien que tu as reçu par email
              en prenant garde à ne pas le modifier.
            </p>
          </div>
        </div>
      </div>

      <div className="text-justify flex items-center justify-center sm:px-6">
        <div className="w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-6">
          <div className="flex items-center justify-center">
            <span className="text-xl font-medium text-gray-900">Connexion</span>
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block">
              <span className="text-sm text-gray-700">Adresse email</span>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </label>
            <label htmlFor="password" className="block mt-3">
              <span className="text-sm text-gray-700">Mot de passe</span>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </label>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                onClick={handleConnexionClick}
              >
                Se connecter
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <label className="inline-flex items-center">
                  <span className="mx-2 text-sm text-gray-600">
                    Vous n'avez pas de compte ?
                  </span>
                  <Link
                    className="block text-sm text-indigo-700 fontme hover:underline"
                    to="/inscription"
                  >
                    S'inscrire
                  </Link>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Container
        style={{ display: `${validation.displayForm}` }}
        component="main"
        maxWidth="xs"
      >
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Problème de connexion
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Les identifiants renseignés sont incorrects.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}
