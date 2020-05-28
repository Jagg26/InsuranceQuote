import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Field = styled.div`
    display:flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none; 
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width:100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Form = ({guardarResumen, guardarCargando}) => {

    //States
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [ error,guardarError ] = useState(false);

    //Extraer valores del State
    const { marca, year, plan } = datos;

    //Leer los datos del formulario y colocarlos en el State
    const obtenerInformacion  = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //OnSubmit
    const cotizarSeguro = e => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //Base de 2000
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        // Por cada año hay que restar el 3%
        resultado -= (( diferencia * 3 ) * resultado ) / 100;


        //Americano 15%+
        //Asiático 5%+
        //Europeo 30%+
        resultado = calcularMarca(marca) * resultado;

        //Básico aumenta 20%
        //Completo 50%
        //const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(obtenerPlan(plan) * resultado).toFixed(2);

        guardarCargando(true);

        setTimeout(() => {

            guardarCargando(false);

            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
 
        }, 2000);

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null}

            <Field>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Field>

            <Field>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />  Completo
            </Field>

            <Button type="submit">Cotizar</Button>
        </form>
    );
}

Form.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Form;