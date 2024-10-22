
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

import jwtAuthService from "app/services/jwtAuthService";
import { userLoggedIn } from "app/redux/auth/authSlice";

import TextField from "app/components/sessions/TextField";
//import SocialButtons from "app/components/sessions/SocialButtons";
 

const validationSchema = yup.object().shape({
  email: yup.string().required("Email é obrigatório"),
  password: yup
    .string()
    .min(4, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória")
});

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Cria uma referência para o campo de input
  //const { isAuthenticated, user } = useSelector((state) => state.auth);


  useEffect(() => {
    // Define o foco no campo quando o componente for montado
    if (inputRef.current) {
      inputRef.current.focus();
    } 
  }, []);



  const initialValues = { email: "", password: "" };

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const result = await jwtAuthService.loginWithEmailAndPassword(value);
      console.log("Result:", result); // Verificar o resultado retornado pelo backend
      if (result.token) {
        dispatch(userLoggedIn({ accessToken: result.token, user: result }));
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
      } else {
        throw new Error('Usuário ou senha inválidos');
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro no login:", error); // Verificar o erro
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Usuário ou senha inválidos. Acesso negado.',
      });
    }
  };

  return (
    <div className="auth-layout-wrap" style={{backgroundImage: `url('/bg_login.jpg')`}}>
      <div className="auth-content">
        <Card className="o-hidden">
          <Row>
            <Col md={6}>
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="Erp Wise" />
                </div>

                <h1 className="mb-3 text-18">Entrar</h1>

                <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}>
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        ref={inputRef}
                        type="text"
                        name="email"
                        label="Usuário"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={errors.email}
                        error={errors.email && touched.email}
                      />

                      <TextField
                        type="password"
                        name="password"
                        label="Senha"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={errors.password}
                        error={errors.password && touched.password}
                      />

                      <button type="submit" disabled={loading} className="btn btn-rounded btn-primary w-100 my-1 mt-2">
                        {loading ? 'Por favor, aguarde' : 'Entrar'}
                      </button>
                    </form>
                  )}
                </Formik>

                {/* <div className="mt-3 text-center">
                  <Link to="/sessions/forgot-password" className="text-muted">
                    Esqueceu a senha?
                  </Link>
                </div> */}
              </div>
            </Col>

            <Col md={6} className="text-center auth-cover" style={{backgroundImage: `url('/publicidade/shopee.png')`}}>
              {/*<div className="pe-3 auth-right">
                 <SocialButtons
                  routeUrl="/sessions/signup"
                  googleHandler={() => Swal.fire("Google sign in clicked!")}
                  facebookHandler={() => Swal.fire("Facebook sign in clicked!")}
                /> 
              </div>*/}
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
