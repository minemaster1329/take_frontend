import {Table} from "reactstrap";
import {useEffect, useState} from "react";
import {Client} from "./Client";
import {FetchError} from "./FetchError";

export default function ClientsOverview() {
    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        fetchData();
    }, [])
    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});

    const fetchData = async () => {
        console.log("Fetching data");
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/getall').then(response => {
            if (response.ok){
                setFetchError({didHappened: false, errorCode: 200, errorMessage: ""})
                return response.json();
            }
            setFetchError({didHappened: true, errorCode: response.status, errorMessage: response.statusText})
            throw new Error("Something went wrong when fetching data!");
        })
            .then(responseJson => {
                setClients(responseJson);
            })
            .catch((reason) => {
                alert("Something went wrong when fetching data!")
            })
    }

    if (fetchError.didHappened){
        return(
            <div>
                <h1>Something went wrong when fetching data!</h1>
                <p>Status code: {fetchError.errorCode}</p>
                <p>Message: {fetchError.errorMessage}</p>
            </div>
        )
    }

    else {
        return(
            <div>
                <h1>Clients overview:</h1>
                <Table striped>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(client => (
                        <tr>
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>{client.address}</td>
                            <td>{client.telephoneNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}