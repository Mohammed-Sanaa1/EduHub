import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/register.css';
import apiRequest from '../apiRequests';
import DataContext from '../contexts/DataProvider';
const API_URL="http://127.0.0.1:3501/users"


const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {

  const {setTheUserId} = useContext(DataContext);
  const navigate = useNavigate();

  const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
    if(storedId)
        navigate('/');
  
  const [email, setEmail] = useState('');

  const [user, setUser] = useState('');
  const [validName, setvalidName] = useState(false);
  const [nFocus, setnFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPass, setvPass] = useState(false);
  const [passFocus, setpFocus] = useState(false);

  const [mpwd, setmPwd] = useState('');
  const [vmPass, setvmPass] = useState(false);
  const [mpfocus, setmpFocus] = useState(false);

  const [errMsg, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setvalidName(user_regex.test(user));
  }, [user]);

  useEffect(() => {
    setvPass(pwd_regex.test(pwd));
    setvmPass(pwd === mpwd);
  }, [pwd, mpwd]);

  const handleRegister = async (e) => {
    e.preventDefault();
    //check with server if the entries are valid
    //check with server if user does not exist
    //check with server if information are saved
    const postOption = {
      method:'POST',
      headers: {
          'Content-type':'application/json'
      },
      body: JSON.stringify({'username':user,'password':pwd, 'email':email})
    }

    let result = true;

    fetch(API_URL, postOption)
      .then(response => {
        if (!response.ok) {
          result = false;
        }
        return response.json(); // Assuming you want to parse the response as JSON
      })
      .then(data => {
        if (result) {
          fetch(`${API_URL}?username=${user}&password=${pwd}`)
            .then(response => response.json()) // Corrected line
            .then(Data => {
              console.log(Data);
              setTheUserId(Data._id);
              localStorage.setItem('authData', JSON.stringify(Data._id));
              localStorage.setItem('accessToken', JSON.stringify(Data.accessToken));
            })
          setSuccess(true);
        } else {
          // setErr('Must use a unique username');
          alert("Your username is already in use");
        }
      })
      .catch(error => {
        // Handle fetch errors here
        console.error('Fetch error:', error);
      });
    


    // let result = true;
    // fetch(API_URL,postOption)
    //   .then(response=>{
    //     if(!response.ok){
    //       result = false;
    //     }
    //   });
    

    // if(result){
    // //   setErr('Must use unique username');
    // // else{
    //   //const response = await fetch(`${API_URL}?username=${user}&password=${pwd}`);
    //   //const data= await response.json();
    //   // const Data = data[0];
    //   //localStorage.setItem('authData', JSON.stringify(data.id));
    //   setSuccess(true);
    // }
    // else{
    //   setErr('Must use unique username');
    // }

    setUser('');
    setPwd('');
    setmPwd('');
  };

  function goToNext(){
    navigate('/more_info');
  }


  return (
    <>
      {success ? (
        goToNext()

      ) : (
        <div className='theContainer col-md-5 col-lg-4'>
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
          <div className='mb-3'>
              <label htmlFor='' className='form-label'>
                Email:
              </label>
              <input
                type='email'
                className={`form-control`}
                id='email'
                required
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setmpFocus(true)}
                onBlur={() => setmpFocus(false)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username:
              </label>
              <input
                type='text'
                className={`form-control ${nFocus && user && !validName ? 'is-invalid' : ''}`}
                id='username'
                required
                value={user}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setnFocus(true)}
                onBlur={() => setnFocus(false)}
              />
              {nFocus && user && !validName && (
                <div className='invalid-feedback'>
                  4 to 24 characters, must begin with a letter
                </div>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password:
              </label>
              <input
                type='password'
                className={`form-control ${passFocus && !validPass ? 'is-invalid' : ''}`}
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={() => setpFocus(true)}
                onBlur={() => setpFocus(false)}
              />
              {passFocus && !validPass && (
                <div className='invalid-feedback'>
                  8 to 24 characters. Must include uppercase and lowercase letters, a number, and a
                  special character.
                </div>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='confirm_pwd' className='form-label'>
                Confirm Password:
              </label>
              <input
                type='password'
                className={`form-control ${mpfocus && !vmPass ? 'is-invalid' : ''}`}
                id='confirm_pwd'
                onChange={(e) => setmPwd(e.target.value)}
                value={mpwd}
                required
                onFocus={() => setmpFocus(true)}
                onBlur={() => setmpFocus(false)}
              />
              {mpfocus && !vmPass && (
                <div className='invalid-feedback'>Must match the first password input field.</div>
              )}
            </div>

            <button
              type='submit'
              className='btn btn-primary BTN_REGESTER'
            >
              Sign Up
            </button>
          </form>

          <p className='py-2'>
            Already registered?{' '}
            <span>
              <Link to='/login'>Login</Link>
            </span>
          </p>
        </div>
      )}
    </>
  );
}
