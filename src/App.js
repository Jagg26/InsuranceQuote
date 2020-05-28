import React, { Fragment, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner'

import styled from '@emotion/styled';

const Container = styled.div`
  max-width:600px;
  margin: 0 auto;

`;

const FormContainer = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

function App() {

  //State
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
  });
  const [cargando, guardarCargando] = useState(false);


  const { datos } = resumen;
  const { cotizacion } = resumen;


  return (
    <Container>
      <Header
        title="Cotizador de Seguros"
      />

      <FormContainer>
        <Form
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />

        {cargando ? <Spinner /> : null}

        {datos ? (
          <Resumen
            datos={datos}
          />
        ) : null}

        {!cargando
          ?
          <Resultado
            cotizacion={cotizacion}
          />
          : null}

      </FormContainer>
    </Container>
  );
}

export default App;
