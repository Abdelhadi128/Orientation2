import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function SingUp () {
    
    // state containe the inputs values
    const [userData, setUserData] = useState({
        schoolName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        phoneNumber:''
    })

    const navigate = useNavigate()

    const initialUserDtata = { schoolName:'', email:'', password:'', phoneNumber:''}

    // state containe the value of comformation password
    const [validPassword, setValidPassword] = useState('')
    const [resMessage, setResMessage] = useState("")

    // state containe the errors of validation inputs
    const [errors, setErrors] = useState({
        schoolName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        phoneNumber:'',
    })

    const[responseMessage, setResponseMessage] = useState('')
    const[errorMessage, setErrorMessage] = useState('')

    // regex of email
    const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // regex of phone number
    const validPhoneNumner = /[0-9]{10}/

    let refEmail = useRef()
    let refPasswordConfirmation = useRef()
    let refPassword = useRef()
    let refSchoolName = useRef()
    let refPhoneNumber = useRef()

    const handleSchoolName = ()=>{
        const school = refSchoolName.current
        if(school.value.trim() === ''){
            setErrors((prevState)=>({...prevState, schoolName:'Le nom de l\'école oubligatoire'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, schoolName: school.value }))
            setErrors((prevState)=>({...prevState, schoolName:''}))
            return true
        }
    }

    const handleEmail = ()=>{
        const email = refEmail.current
        if(!email.value.trim() === ''){
            setErrors((prevState)=>({...prevState, email:'L\'émail oubligatoire'}))
            return false
        }else if(!email.value.match(validateEmail)){
            setErrors((prevState)=>({...prevState, email:"L'email n'est pas valide"}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, email:email.value}))
            setErrors((prevState)=>({...prevState, email:""}))
            return true
        }
    }

    const handlePassword = ()=>{
        const password = refPassword.current
        if(password.value.trim() === ''){
            setErrors((prevState)=>({...prevState, password:'Mot de passe oubligatoire'}))
            return false
        }else if(password.value.trim().length < 8){
            setErrors((prevState)=>({...prevState, password:'Le mot de passe doit contenir au moins 8 caractères'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, password: password.value}))
            setErrors((prevState)=>({...prevState, password:''}))
            return true
        }
    }

    const handlePhoneNumber = ()=>{
        const phone = refPhoneNumber.current
        if(phone.value.trim() === ''){
            setErrors((prevState)=>({...prevState, phoneNumber:'Numéro de téléphone oubligatoire'}))
            return false
        }else if(!phone.value.match(validPhoneNumner)){
            setErrors((prevState)=>({...prevState, phoneNumber:"Le numéro de téléphone n'est pas valide (ex: 061010101)"}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, phoneNumber: phone.value}))
            setErrors((prevState)=>({...prevState, phoneNumber:''}))
            return true
        }
    }

    const handlePasswordConfirmation = ()=>{
        const confirmation = refPasswordConfirmation.current
        if(confirmation.value.trim() !== userData.password.trim() && userData.password.trim() !== ''){
            setErrors((prevState)=>({...prevState, passwordConfirmation:'Le mots de passe ne correspondent pas.'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, passwordConfirmation: confirmation.value}))
            setErrors((prevState)=>({...prevState, passwordConfirmation:''}))
            return true
        }
    }


    
    //  check the values of the inputs
    const handleData = async (e)=>{
        e.preventDefault()
        let validForm = true
        // handleSchoolName() 
        //     handleEmail()
        //     handlePassword()
        //     handlePasswordConfirmation()
        //     handlePhoneNumber()

        // if(handleSchoolName && handleEmail && handlePassword && handlePasswordConfirmation && handlePhoneNumber){
        //     validForm = true
        //     refEmail.current.value = ''
        //     refPasswordConfirmation.current.value = ''
        //     refPassword.current.value = ''
        //     refSchoolName.current.value = ''
        //     refPhoneNumber.current.value = ''
        //     console.log(handleSchoolName , 'IF')

        // }else{
        //     handleSchoolName() 
        //     handleEmail()
        //     handlePassword()
        //     handlePasswordConfirmation()
        //     handlePhoneNumber()
        //     console.log(handleSchoolName , 'ELSE')
        // }
        
        if(userData.schoolName.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, schoolName:'Le nom de l\'école oubligatoire'}))
        }else{
            setErrors((prevState)=>({...prevState, schoolName:''}))
        }
        if(userData.email.trim() === ''){
            setErrors((prevState)=>({...prevState, email:'L\'émail oubligatoire'}))
        }else if(!userData.email.match(validateEmail)){
            
            setErrors((prevState)=>({...prevState, email:"L'email n'est pas valide"}))
        }else{
            setErrors((prevState)=>({...prevState, email:''}))
        }

        if(userData.password.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, password:'Mot de passe oubligatoire'}))
        }else if(userData.password.trim().length < 8){
            validForm = false
            setErrors((prevState)=>({...prevState, password:'Le mot de passe doit contenir au moins 8 caractères'}))
        }else{
            setErrors((prevState)=>({...prevState, password:''}))
        }

        if(userData.passwordConfirmation.trim() !== userData.password.trim() && userData.password.trim() !== ''){
            validForm = false
            setErrors((prevState)=>({...prevState, passwordConfirmation:'Le mots de passe ne correspondent pas.'}))
        }else{
            setErrors((prevState)=>({...prevState, passwordConfirmation:''}))
        }

        if(userData.phoneNumber.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, phoneNumber:'Numéro de téléphone oubligatoire'}))
        }else if(!userData.phoneNumber.trim().match(validPhoneNumner)){
            validForm = false
            setErrors((prevState)=>({...prevState, phoneNumber:"Le numéro de téléphone n'est pas valide (ex: 061010101)"}))
        }else{
            setErrors((prevState)=>({...prevState, phoneNumber:''}))
        }

        try{
            if(validForm){
                refEmail.current.value = ''
                refPasswordConfirmation.current.value = ''
                refPassword.current.value = ''
                refSchoolName.current.value = ''
                refPhoneNumber.current.value = ''
                console.log(userData)
                const response = await axios.post('http://localhost:5001/api/register',userData)
        
                if(response.data.message){
                    setErrorMessage('')
                    console.log(response.data.id)
                    setResponseMessage(response.data.message)
                    setUserData(initialUserDtata)
                    navigate(`/school/${response.data.id}`)
                }else{
                    setErrorMessage(response.data.error)
                }
            }
        }catch(error){
            // console.log('ERROR', error);
            if (error.response) {
                // console.log('Réponse serveur (erreur):', error.response.data);
                setResponseMessage('')
                setErrorMessage(error.response.data.error || "Une erreur est survenue lors de l'inscription.");
            } else {
                setResponseMessage('')
                setErrorMessage("Problème de connexion au serveur.");
            }
        }
    }

    return (
         <div className="min-h-96 bg-white flex items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-8 gap-15">
      {/* Partie gauche avec le logo et slogan */}
      <div className="hidden lg:block text-center w-1/2">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">DALLEL</h1>
        <h4 className="text-2xl font-semibold text-gray-600">Ensemble vers un meilleur avenir !</h4>
      </div>

      {/* Partie droite avec le formulaire */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Messages de feedback */}
        {responseMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            <span className="font-medium">{responseMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleData}>
          <h1 className="text-3xl font-bold text-center text-blue-800">Créer un compte</h1>

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              ref={refEmail}
              onChange={handleEmail}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="votre@email.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              ref={refPassword}
              onChange={handlePassword}
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              ref={refPasswordConfirmation}
              onChange={handlePasswordConfirmation}
              className={`mt-1 block w-full px-3 py-2 border ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="••••••••"
            />
            {errors.passwordConfirmation && <p className="mt-2 text-sm text-red-600">{errors.passwordConfirmation}</p>}
          </div>

          {/* Champs en ligne (Nom école et Téléphone) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">Nom d'école</label>
              <input
                type="text"
                id="schoolName"
                ref={refSchoolName}
                onChange={handleSchoolName}
                className={`mt-1 block w-full px-3 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Nom de votre école"
              />
              {errors.schoolName && <p className="mt-2 text-sm text-red-600">{errors.schoolName}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="tel"
                id="phone"
                ref={refPhoneNumber}
                onChange={handlePhoneNumber}
                className={`mt-1 block w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="06 12 34 56 78"
              />
              {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            S'inscrire
          </button>

          {/* Liens de navigation */}
          <div className="text-sm text-center space-y-2">
            <p className="text-gray-600">
              Déjà inscrit ?{' '}
              <Link to="/Login" className="font-medium text-blue-600 hover:text-blue-500">
                Se connecter
              </Link>
            </p>
            <p className="text-gray-600">
              Vous êtes étudiant ?{' '}
              <Link to="/Register" className="font-medium text-blue-600 hover:text-blue-500">
                Inscrivez-vous ici
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    )
}
