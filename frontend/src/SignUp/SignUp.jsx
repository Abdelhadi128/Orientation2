import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
        if(email.value.trim() === ''){
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

        if(userData.schoolName.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, schoolName:'Le nom de l\'école oubligatoire'}))
        }else{
            setErrors((prevState)=>({...prevState, schoolName:''}))
        }
        if(userData.email.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, email:'L\'émail oubligatoire'}))
        }else if(!userData.email.match(validateEmail)){
            validForm = false
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
            if (error.response) {
                setResponseMessage('')
                setErrorMessage(error.response.data.error || "Une erreur est survenue lors de l'inscription.");
            } else {
                setResponseMessage('')
                setErrorMessage("Problème de connexion au serveur.");
            }
        }
    }

    return (
        <div>
            {responseMessage && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium"> {responseMessage}</span> 
                                </div>
            }
            {errorMessage && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium"> {errorMessage}</span> 
                                </div>
            }
            <div className='h-screen lg:flex md:block sm:block items-center justify-around'>
                <div className='lg:w-1/2 xl:w-1/2 2xl:w-1/2 md:w-full sm:w-full lg:flex xl:flex 2xl:flex hidden h-full items-center justify-center text-center px-4'>
                    <div>
                        <h1 className='mb-4 text-4xl text-blue-700 font-extrabold leading-none tracking-tight md:text-5xl lg:text-5xl dark:text-white'>
                            <span className="self-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 animate-smoothPulse">DALLEL</span>
                        </h1>
                        <p className='lg:text-3xl text-2xl font-bold'>
                            Ensemble vers un meilleur avenir !
                        </p>
                    </div>
                </div>
                <div className='lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-full flex items-center justify-center px-4'>
                    <form className="w-full max-w-md mx-auto p-4 bg-white rounded-md shadow-md" onSubmit={handleData}>
                        <div>
                            <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white text-center">Créer un compte</h1>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="floating_email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <input
                            type="email"
                            ref={refEmail}
                            onChange={handleEmail}
                            name="floating_email"
                            id="floating_email"
                            className="w-full px-3 py-1.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your email"
                            />
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="floating_password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
                            <input
                            type="password"
                            ref={refPassword}
                            onChange={handlePassword}
                            name="floating_password"
                            id="floating_password"
                            className="w-full px-3 py-1.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your password"
                            />
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="floating_repeat_password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirmé le mot de passe</label>
                            <input
                            type="password"
                            ref={refPasswordConfirmation}
                            onChange={handlePasswordConfirmation}
                            name="repeat_password"
                            id="floating_repeat_password"
                            className="w-full px-3 py-1.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Confirm your password"
                            />
                            <p className="mt-1 text-sm text-red-600">{errors.passwordConfirmation}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="schoolName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nom de l'école</label>
                            <input
                            type="text"
                            ref={refSchoolName}
                            onChange={handleSchoolName}
                            id="schoolName"
                            className="w-full px-3 py-1.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Entrez le nom de l'école"
                            />
                            <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Numéro de téléphone</label>
                            <input
                            type="text"
                            ref={refPhoneNumber}
                            onChange={handlePhoneNumber}
                            id="phoneNumber"
                            className="w-full px-3 py-1.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Entrez votre numéro de téléphone"
                            />
                            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                        </div>

                        <div className="mb-5 flex justify-center">
                            <button type="submit" className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition-colors">
                                S'inscrire
                            </button>
                        </div>

                        <p className="text-center text-gray-600">
                            Vous avez déjà un compte ?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline">
                            Se connecter
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}
