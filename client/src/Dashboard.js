import React, {useState, useEffect} from 'react';
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try{
            const response = await axios.get("http://localhost:4500/api/data");
            setData(response.data);
        }
        catch(error) {
            console.log("Error occured while fetching data");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <React.Fragment>
             {
            data.length > 0 && (
                <div> {`Hello ${data[0].name}`} </div>
            )
        }
        </React.Fragment>
    )
}

export default Dashboard
