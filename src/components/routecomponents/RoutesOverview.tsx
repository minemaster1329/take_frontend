import {useEffect, useState} from "react";
import {RouteClass} from "./RouteClass";
import {FetchError} from "../FetchError";
import {Link, useNavigate} from "react-router-dom";
import {Button, Table} from "reactstrap";

export default function RoutesOverview() {
    const [routes, setRoutes] = useState<RouteClass[]>([]);
    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/route/getall', {
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
                setRoutes(responseJson);
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
                    <h1>Routes overview:</h1>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Route</th>
                        </tr>
                        </thead>
                        <tbody>
                        {routes.map(r => (
                            <tr key={r.id}>
                                <td>{r.date}</td>

                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Link to='/routesoverview'>Add new defined route</Link>
                </div>
            )


        }
    }
}