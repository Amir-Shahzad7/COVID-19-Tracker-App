import React, { useEffect, useState } from "react";
import "./Charts.css";
import { fetchDailyData } from "../../Api";
import { Bar, Line } from "react-chartjs-2";

function Charts({ data: { confirmed, recovered, deaths }, country }) {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        async function fetchedDailyData() {
            setDailyData(await fetchDailyData());
        }

        fetchedDailyData();
    }, []);

    const LineChart = (
        dailyData.length
        ?
        (
        <Line 
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: "Infected",
                    borderColor: "#3333ff",
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: "Deaths",
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    fill: true,
                }],
            }}
            height={400}
            width={600}
        />
        ) : null
    );

    const BarChart = (
        confirmed
        ?
        (
            <Bar 
                data={{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        label: "People",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current situation in ${country}`, fontSize: 25 },
                }}
            />
        ) : null
    )

    return (
        <div className="Charts">
            <div className="LineBarChart">
                {country ? BarChart : LineChart}
            </div>
        </div>
    )
}

export default Charts;
