import {  useState, useEffect, useContext } from 'react';
// import AuthContext from '../context/AuthProvider';
import {Link, useNavigate} from 'react-router-dom'
import DataContext from '../contexts/DataProvider';
import './styles/register.css';
//import {toast} from 'react-toastify'
const Login = () => {
 
    const {setTheUserId} = useContext(DataContext);
    const navigate = useNavigate();

    const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
    if(storedId)
        navigate('/');

    const API_URL="http://localhost:8500/users"
    // const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg]= useState('')
    useEffect(()=>{
        setErrMsg('')   
    },[user,pwd])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //setup json-server with db.json dataset for testing
            //call API: security concerns to be discussed later in the course
            const response = await fetch(`http://127.0.0.1:3501/users?username=${user}&password=${pwd}`);
            // console.log(response)
            const data= await response.json();
            console.log(data);
            if (data._id) {
                // const Data = data[0];
                // const accessToken = Data.accessToken;
                // const roles = Data.roles;
                // setAuth({ user, pwd, roles, accessToken });
                console.log("Hello");
                setTheUserId(data._id);
                localStorage.setItem('authData', JSON.stringify(data._id));
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                setUser('');
                setPwd('');
                //toast.success('you are logged in!');
                setSuccess(true);
            } else{
                setErrMsg('Username or Password is incorrect!');
            }
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    function goToNext(){
        navigate('/dashboard');
      }

    return (
        <>
            {success ? (
                goToNext()
            ) : (
                <div className='theContainer col-md-5 col-lg-4'>
                  <p  className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>
                  <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                      <div className='mb-3'>
                      <label htmlFor='username' className='form-label'>Username:</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                      </div>
                        
                      <div className='mb-3'>
                      <label htmlFor='password' className='form-label'>Password:</label>
                        <input
                            type="password"
                            className={`form-control`}
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                      </div>

                      <button type='submit' className='btn btn-primary BTN_LOGIN'>Log In</button>
                    </form>
                    <p className='py-2'>
                      New user?{' '}
                      <span>
                        <Link to='/Register'>Register</Link>
                      </span>
                    </p>
                </div>
            )}
        </>
    )
}

export default Login
