import {Button, Table} from "reactstrap";
import {useEffect, useState} from "react";
import {Client} from "./Client";
import {FetchError} from "../FetchError";
import {Link, useNavigate} from "react-router-dom";

export default function ClientsOverview() {
    const [clients, setClients] = useState<Client[]>([]);
    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/getall', {
            method: 'GET'
        }).then(response => {
            if (response.ok){
                setFetchError({didHappened: false, errorCode: 200, errorMessage: ""})
                return response.json();
            }
            setFetchError({didHappened: true, errorCode: response.status, errorMessage: response.statusText})
            throw new Error("Something went wrong when fetching data!");
        })
            .then(responseJson => {
                setLoading(false)
                //console.log(responseJson);
                setClients(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }

    const navigate = useNavigate();

    const handleDelete = async (clientId: number) => {
        await fetch(
            'http://localhost:8080/take/client/delete/${clientId}', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) alert("Client removed successfully");
                else alert("Something went wrong!")
            })
        setClients([]);
        await fetchData();
    }

    const handleEdit = async(clientId: number) => {
        navigate('/editclient', {state: {clientId: clientId}})
    }

    const handleDetails = async(clientId: number) => {
        navigate('/clientdetails', {state: {clientID: clientId}})
    }

    if (loading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    else {
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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.address}</td>
                                <td>{client.telephoneNumber}</td>
                                <td>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleDetails(client.id)}>Details</Button>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleEdit(client.id)}>Edit</Button>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleDelete(client.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Link to='/addnewclient'>Add new client</Link>
                </div>
            )
        }
    }
}