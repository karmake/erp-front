import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "app/components/sessions/TextField";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser idênticas")
    .required("Confirmação de senha é obrigatória"),
});

export default function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); // Para manter o email enviado
  const initialModalValues = { password: "", confirmPassword: "" };

  const handlePasswordReset = async (values) => {
    try {
      // Fazendo a requisição PATCH para o endpoint /api/usuarios/alterar
      const response = await axios.patch("/api/usuarios/alterar", {
        email: email, // Enviando o email
        senhaUSUARIO: values.password, // Enviando apenas a nova senha
      });

      setShowModal(false);
      Swal.fire("Sucesso", "Senha alterada com sucesso!", "success");
    } catch (error) {
      Swal.fire("Erro", "Ocorreu um erro ao alterar a senha.", "error");
    }
  };

  return (
    <div
      className="auth-layout-wrap"
      style={{ backgroundImage: "url('/bg_login.jpg')" }}
    >
      <div className="auth-content">
        <Card className="o-hidden">
          <Row>
            <Col md={6}>
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="Gull" />
                </div>

                <h1 className="mb-3 text-18">Recuperar senha</h1>

                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={yup.object().shape({
                    email: yup
                      .string()
                      .email("Email inválido")
                      .required("Email é obrigatório"),
                  })}
                  onSubmit={(values) => {
                    setEmail(values.email); // Salva o email do formulário
                    setShowModal(true); // Exibe o modal para alteração de senha
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        type="email"
                        name="email"
                        label="Email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={errors.email}
                        error={errors.email && touched.email}
                      />

                      <button
                        className="btn btn-rounded btn-primary w-100 mt-2"
                        type="submit"
                      >
                        Solicitar Alteração de Senha
                      </button>
                    </form>
                  )}
                </Formik>

                <div className="mt-3 text-center">
                  <Link to="/sessions/signin" className="text-muted">
                    Voltar ao login
                  </Link>
                </div>
              </div>
            </Col>

            <Col
              md={6}
              className="text-center auth-cover"
              style={{ backgroundImage: `url('/publicidade/shopee.png')` }}
            ></Col>
          </Row>
        </Card>
      </div>

      {/* Modal para alteração de senha */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialModalValues}
            validationSchema={validationSchema}
            onSubmit={handlePasswordReset}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nova Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Alterar Senha
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}
