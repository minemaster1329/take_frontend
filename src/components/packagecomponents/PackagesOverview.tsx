import {Button, Table} from "reactstrap";
import {useEffect, useState} from "react";
import {Package} from "./Package";
import {FetchError} from "../FetchError";
import {Link, useNavigate} from "react-router-dom";

export default function PackagesOverview() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetchData();
    }, [])

    //'http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/getall'
    //'http://localhost:8080/take/client'
    const fetchData = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/clientPackage/getall', {
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
                setPackages(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }

    const navigate = useNavigate();

    const handleDelete = async (packageId: number) => {
        await fetch(//`http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/delete/${clientId}`
            'http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/delete/${packageId}', {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) alert("Client removed successfully");
                else alert("Something went wrong!")
            })
        setPackages([]);
        await fetchData();
    }

    const handleEdit = async(packageId: number) => {
        navigate('/editpackage', {state: {packageId: packageId}})
    }

    const handleDetails = async(packageId: number) => {
        navigate('/packagedetails', {state: {packageId: packageId}})
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
                    <h1>Packages overview:</h1>
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
                        {packages.map(_package => (
                            <tr key={_package.id}>
                                <td>{_package.deliveryAddress}</td>
                                <td>{_package.weight}</td>
                                <td>{_package.estimatedDeliveryDate}</td>
                                <td>{_package.isPaidFor}</td>
                                <td>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleDetails(_package.id)}>Details</Button>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleEdit(_package.id)}>Edit</Button>
                                    <Button className='btn btn-primary mx-2' onClick={() => handleDelete(_package.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Link to='/addnewpackage'>Add new package</Link>
                </div>
            )
        }
    }
}