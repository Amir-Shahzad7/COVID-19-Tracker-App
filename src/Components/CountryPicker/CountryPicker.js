import React, { useState, useEffect } from "react";
import "./CountryPicker.css"
import { Countries } from "../../Api";
import { NativeSelect, FormControl } from "@material-ui/core";

function CountryPicker({ handleCountryChange }) {

    const [countriesNames, setCountryName] = useState([]);

    useEffect(() => {
        async function fetchedCountries() {
            setCountryName(await Countries());
        }

        fetchedCountries();
    }, [setCountryName]);

    return (
        <FormControl className="CountryPicker">
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {countriesNames.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
