import React from "react";

const Countries = (props) => {
    if(props.countries.length > 10){
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }else if(props.countries.length > 1){
        return (
            <div>
                {props.countries.map(country => <Country key={country.name.common} name={country.name.common} />)}    
            </div>
            
        )
    }else if(props.countries.length === 1){
        return (
            <div>
                <h2>{props.countries[0].name.common}</h2>
                <p>capital {props.countries[0].capital.join(' ')}</p>
                <p>area {props.countries[0].area} </p>
                <p>languages:</p>
                <ul>
                    {Object.entries(props.countries[0].languages).map(([key, value]) => <li key={key}>{value}</li>)}
                </ul>
                <img src={props.countries[0].flags.png}  />
            </div>
        )
    }
}

const Country = ({name}) => <p>{name}</p>

export default Countries