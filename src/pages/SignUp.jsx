import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import OAuth from '../components/OAuth'
//firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from '../firebase/firebase.config'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange  = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
    console.log(formData)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {

      //creating user (can see in Firebase Auth after submitting the form)

      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
      
      //updating user name in Firebase user obj (user.current.displaynme)
      updateProfile(auth.currentUser, {
        displayName: name
      })

      //adding user to db (can see in Firebase Firestore after submitting the form)

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db,'users', user.uid),formDataCopy)

      navigate('/')
      
    } catch (error) {
      toast.error('Something went wrong with registration')
    }

  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back!</p>
      </header>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />

        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />

        <div className="passwordInputDiv">
          <input
            type={showPassword ? 'text' : 'password'}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

        </div>
      </form>
      
      <OAuth/>

      <Link to='/sign-in' className='registerLink'>
          Sign In Instead
      </Link>
      
    </div>
  )
}

export default SignUp