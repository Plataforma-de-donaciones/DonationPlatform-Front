import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../../../AuthContext';
import Sessionheader from './Sessionheader';
import UserInput from './UserInput';
import PasswordInput from './PasswordInput';
import Registratebutton1 from './Registratebutton1';
import EnterButton from './EnterButton';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import instance from '../../../../../axios_instance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #FFF;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CorreoNombreText = styled.span`
  font-weight: 700;
  color: #121212;
  text-align: left;
  margin-top: 10px;
  width: 100%;
`;

const ContrasenaText = styled.span`
  font-weight: 700;
  color: #121212;
  text-align: left;
  margin-top: 20px;
  width: 100%;
`;

const NotienescuentaaunWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const NotienescuentaaunText = styled.span`
  font-weight: 700;
  color: #121212;
  text-align: left;
`;

const SocialLogosWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const GoogleLogo = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  margin-right: 10px;
  cursor: pointer;
`;

const FbLogo = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  margin-left: 10px;
`;

const LoginBox = () => {
  const [credentials, setCredentials] = useState({
    user_name: '',
    user_password: '',
  });

  const [redirectToHome, setRedirectToHome] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    

    if(credentials.user_name.length == 0 || credentials.user_password.length == 0){
      toast.error('Por favor complete los campos requeridos', {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    
    // if (!recaptchaValue) {
    //   toast.error('Por favor, completa el reCAPTCHA.', {
    //     position: 'bottom-center',
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'colored',
    //   });
    //   return;
    // }

    try {
      const response = await instance.post('/login/', credentials);

      if (response.status === 200) {
        const { token, user_data } = response.data;
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('user_data', JSON.stringify(user_data), { expires: 1 });
        login();
        setRedirectToHome(true);
      } else if (response.status === 401) {
        setError('Usuario o contraseña incorrectos.');
        toast.error('Usuario o contraseña incorrectos.', {
          position: 'bottom-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else if (response.data && response.data.error_message) {
        // Maneja el mensaje de error
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al conectarse al servidor. Inténtalo de nuevo más tarde.');
    }
  };

  const handleGoogleLogin = async () => {
    // Implementa la lógica de inicio de sesión con Google aquí.
    // Usando las credenciales que generó Google para tu cliente OAuth.

    // Cuando el inicio de sesión con Google sea exitoso, puedes redirigir al usuario a la página de inicio.
    try {
      // Implementa la lógica de inicio de sesión con Google aquí.

      // Si el inicio de sesión con Google es exitoso, redirige al usuario a la página de inicio.
      login();
      setRedirectToHome(true);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      // Maneja errores si los hay.
    }
  };

  if (redirectToHome) {
    return <Redirect to="/inicio" />;
  }

  return (
    <Container>
      <Sessionheader style={{ width: '100%', height: 43 }} />
      <CorreoNombreText>Correo electrónico o nombre de usuario</CorreoNombreText>
      <InputWrapper>
        <FaUser
          style={{
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 20,
            marginRight: 10,
          }}
        />
        <UserInput
          type="text"
          name="user_name"
          value={credentials.user_name}
          onChange={handleChange}
          style={{
            height: 43,
            width: '100%',
            marginTop: 10,
          }}
          group="rgba(155,155,155,1)"
        />
      </InputWrapper>
      <ContrasenaText>Contraseña</ContrasenaText>
      <InputWrapper>
        <FaLock
          style={{
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 20,
            marginRight: 10,
          }}
        />
        <PasswordInput
          type="password"
          name="user_password"
          value={credentials.user_password}
          onChange={handleChange}
          passwordplaceholder="Contraseña"
          style={{
            height: 43,
            width: '100%',
            marginTop: 10,
          }}
        />
      </InputWrapper>

      {/* <ReCAPTCHA
        sitekey="6Lcqru0oAAAAAMEbouI6kXlIMjofIZr__aX33Aer" //cambiar esta key para prod
        onChange={handleRecaptchaChange}
      /> */}
      <NotienescuentaaunWrapper>
        <NotienescuentaaunText>No tienes una cuenta aún?</NotienescuentaaunText>
        <Link to="/alta">
          <Registratebutton1
            style={{
              height: 17,
              width: 100,
              marginLeft: 10,
            }}
          />
        </Link>
      </NotienescuentaaunWrapper>
      <SocialLogosWrapper>
        <GoogleLogo
          src={require('../assets/images/google.png')}
          onClick={handleGoogleLogin}
        />
        <FbLogo src={require('../assets/images/facebook-logo-5-1.png')} />
      </SocialLogosWrapper>
      <EnterButton
        style={{
          height: 36,
          width: 100,
          marginTop: 20,
          borderRadius: 100,
        }}
        onClick={handleSubmit}
      />
      {error && 
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      }
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </Container>
  );
};

export default LoginBox;
