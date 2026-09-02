import { useEffect, useState } from "react";

function TelemetryData(){
    const [data, setPlantData] = useState([]);
    

    useEffect(() => {
        async function getPlantData(){
            try{
                const response = await fetch("http://localhost:8080/telemetry");
                if(!response.ok){
                    throw new Error("Failed to fetch plant data");
                }
                const data = await response.json();
                setPlantData(data);
            }catch(error){
                console.error(error);
            }

        }
        getPlantData()
    }, []);

    return(
        <div>
            <h1>Plant Data: </h1>
            {data.map((plant) =>(
                <p key={plant.id}>
                   ID: {plant.id}, Sunlight Amount: {plant.sunlight}
                </p>
            ))}
        </div>
    )

}
export {TelemetryData};