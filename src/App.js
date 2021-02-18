import React from "react";
import "./App.css";
import Image from "./Images/COVID-19.png";
import { Cards, Charts, CountryPicker } from "./Components";
import { fetchData } from "./Api";

class App extends React.Component {
    state = {
        data: {},
        country: "",
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className="App">
                <img className="Image" src={Image} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country} />
            </div>
        )
    }
}

export default App;
