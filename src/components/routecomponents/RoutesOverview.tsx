import {useEffect, useState} from "react";
import {DefinedRoute} from "./DefinedRoute";
import {FetchError} from "../FetchError";
import {Link, useNavigate} from "react-router-dom";
import {Button, Table} from "reactstrap";

export default function RoutesOverview() {
    const [definedRoutes, setDefinedRoutes] = useState<DefinedRoute[]>([]);
    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/definedRoute/getall', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                setFetchError({didHappened: false, errorCode: 200, errorMessage: ""})
                return response.json();
            }
            setFetchError({didHappened: true, errorCode: response.status, errorMessage: response.statusText})
            throw new Error("Something went wrong when fetching data!");
        })
            .then(responseJson => {
                setLoading(false)
                //console.log(responseJson);
                setDefinedRoutes(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        if (fetchError.didHappened) {
            return (
                <div>
                    <h1>Something went wrong when fetching data!</h1>
                    <p>Status code: {fetchError.errorCode}</p>
                    <p>Message: {fetchError.errorMessage}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Defined routes overview:</h1>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Starting Location</th>
                            <th>Destination</th>
                            <th>Distance (KM)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {definedRoutes.map(definedRoute => (
                            <tr key={definedRoute.id}>
                                <td>{definedRoute.startingLocation}</td>
                                <td>{definedRoute.destination}</td>
                                <td>{definedRoute.distanceKM}</td>

                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Link to='/addnewdefinedroute'>Add new defined route</Link>
                </div>
            )


        }
    }
}