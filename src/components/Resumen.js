import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { uppercase } from '../helper';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {


    return (
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {uppercase(datos.marca)}</li>
                <li>Plan: {uppercase(datos.plan)}</li>
                <li>Año: {uppercase(datos.year)}</li>
            </ul>
        </ContenedorResumen>
    );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;