import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import API from '../components/API'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Helmet } from 'react-helmet'
import {
  validateEmail,
  isSiret,
  onlyLetters,
  isPwMore8cha,
} from '../components/functionshelper'

export default function SignUp() {
  const [open, setOpen] = React.useState(false)
  const [openPasswordsNotEqual, setOpenPasswordsNotEqual] = useState(false)
  const [openErrorDuplicateEmail, setOpenErrorDuplicateEmail] = useState(false)
  const [openErrorSiretFormat, setOpenErrorSiretFormat] = useState(false)
  const [checkboxModalError, setCheckboxModalError] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const history = useHistory()
  const [checked, setChecked] = useState(false)
  const [infosRegistration, setInfosRegistration] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    siret: '',
  })

  useEffect(() => {
    setChecked(false)
  }, [])

  const handleCheckbox = (e) => {
    setChecked(!checked)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpenPasswordsNotEqual = () => {
    setOpenPasswordsNotEqual(true)
  }

  const handleClosePasswordsNotEqual = () => {
    setOpenPasswordsNotEqual(false)
  }
  const handleOpenErrorSiretFormat = () => {
    setOpenErrorSiretFormat(true)
  }

  const handlCloseErrorSiretFormat = () => {
    setOpenErrorSiretFormat(false)
  }

  const handleOpenErrorDuplicateEmail = () => {
    setOpenErrorDuplicateEmail(true)
  }

  const handleCloseErrorDuplicateEmail = () => {
    setOpenErrorDuplicateEmail(false)
  }

  const handleOpenCGError = () => {
    setCheckboxModalError(true)
  }

  const handleCloseCGError = () => {
    setCheckboxModalError(false)
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    if (!isPwMore8cha(infosRegistration.password)) {
      handleClickOpen()
    } else if (
      infosRegistration.password !== infosRegistration.passwordConfirmation
    ) {
      handleClickOpenPasswordsNotEqual()
    } else if (!isSiret(infosRegistration.siret)) {
      handleOpenErrorSiretFormat()
    } else if (!checked) {
      handleOpenCGError()
    } else {
      const registration_date = new Date().toISOString().slice(0, 10)
      if (
        validateEmail(infosRegistration.email) &&
        isSiret(infosRegistration.siret) &&
        onlyLetters(infosRegistration.firstname) &&
        onlyLetters(infosRegistration.lastname) &&
        checked
      ) {
        const payload = { ...infosRegistration, registration_date }
        API.post('/users', payload)
          .then((res) => res.data)
          .then((data) => {
            history.push('/reception_email')
          })
          .catch((error) => {
            console.log(error)
            handleOpenErrorDuplicateEmail()
          })
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Inscription</title>
      </Helmet>

      <div className="text-justify flex p-1 py-12 bg-white place-content-center">
        <div className="max-w-lg overflow-hidden border border-gray-200 rounded-lg">
          <div className="mt-8 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">
              Créer votre compte
            </span>
          </div>
          <form className="w-full max-w-lg" onSubmit={handlesubmit}>
            <div className="p-10 pb-6">
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-first-name"
                  >
                    Prénom
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        firstname: e.target.value,
                      })
                    }
                    value={infosRegistration.firstname}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-last-name"
                  >
                    Nom de famille
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        lastname: e.target.value,
                      })
                    }
                    value={infosRegistration.lastname}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 mb-6">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-email"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-email"
                    type="email"
                    placeholder="janedoe@example.com"
                    required
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        email: e.target.value,
                      })
                    }
                    value={infosRegistration.email}
                  />
                </div>
                <div className="w-full px-3 mb-6">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-password"
                  >
                    Mot de passe
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-password"
                    type="password"
                    placeholder="***********"
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        password: e.target.value,
                      })
                    }
                    value={infosRegistration.password}
                  />
                </div>
                <div className="w-full px-3 mb-6">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-password"
                  >
                    Confirmation du mot de passe
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-password"
                    type="password"
                    placeholder="***********"
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        passwordConfirmation: e.target.value,
                      })
                    }
                    value={infosRegistration.passwordConfirmation}
                  />
                </div>
                <div className="w-full px-3 mb-6">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-number"
                  >
                    Siret
                  </label>
                  <input
                    className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                    id="grid-email"
                    type="text"
                    placeholder="XXXXXXXXXXXXXX"
                    onChange={(e) =>
                      setInfosRegistration({
                        ...infosRegistration,
                        siret: e.target.value,
                      })
                    }
                    value={infosRegistration.siret}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  required
                  id="rememberme"
                  name="rememberme"
                  className="w-4 h-4 mr-2"
                  type="checkbox"
                  onChange={handleCheckbox}
                />
                <label htmlFor="rememberme" className="text-sm">
                  <span className="mr-1 text-gray-500">J'accepte les </span>
                  <Link
                    className="font-medium text-indigo-600 underline"
                    to="/conditions_generales"
                  >
                    conditions générales
                  </Link>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 text-center bg-gray-200">
              <div className="relative flex flex-col items-start mr-1 text-sm">
                <span className="mr-1 text-gray-500">
                  Vous avez déjà un compte ?
                </span>
                <Link
                  to="/connexion"
                  className="block font-medium text-indigo-600 underline"
                >
                  Se connecter
                </Link>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              >
                Créer ma fiche freelance
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Container component="main" maxWidth="xs">
          <Box mt={5} />
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Mot de passe :{' '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                8 caractères minimum sont recquis.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openPasswordsNotEqual}
            onClose={handleClosePasswordsNotEqual}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Mot de passe :{' '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Les mots de passe ne sont pas identiques.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClosePasswordsNotEqual}
                color="primary"
                autoFocus
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openErrorDuplicateEmail}
            onClose={handleCloseErrorDuplicateEmail}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Adresse e-mail :{' '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Cette adresse e-mail est déjà utilisée. Merci d'en choisir une
                autre, valide.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseErrorDuplicateEmail}
                color="primary"
                autoFocus
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openErrorSiretFormat}
            onClose={handleOpenErrorSiretFormat}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Numéro de siret :{' '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Merci de renseigner un numéro de siret conforme.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlCloseErrorSiretFormat}
                color="primary"
                autoFocus
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={checkboxModalError}
            onClose={handleOpenErrorSiretFormat}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Conditions générales :{' '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Merci de cocher la case relative à l'acceptation des conditions
                générales
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCGError} color="primary" autoFocus>
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  )
}
