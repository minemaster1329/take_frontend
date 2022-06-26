import {useLocation} from "react-router-dom";
import {CarIdOnly} from "./Car";
import {useEffect, useState} from "react";
import {FetchError} from "../FetchError";
import {Package} from "../packagecomponents/Package";
import {RouteClass} from "../routecomponents/RouteClass";
import {Table} from "reactstrap";
import {DefinedRoute} from "../definedroutecomponents/DefinedRoute";

export default function CarDetails() {
    const location = useLocation()
    const {carId} = location.state as CarIdOnly

    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);
    const [routes, setRoutes] = useState<RouteClass[]>([])


    useEffect(() => {
        const fetchRoutes = async () => {
            await fetch(`http://localhost:8080/take_project-1.0-SNAPSHOT/api/route/forcar/${carId}`, {
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

        fetchRoutes();


    }, [carId])

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
                    <h1>Car {carId} routes</h1>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date </th>
                            <th>Start Location </th>
                            <th>Destination</th>

                        </tr>
                        </thead>
                        <tbody>


                        {routes.map(_route => (

                            <tr>
                                <td>{_route.id}</td>
                                <td>{new Date(parseInt(_route.date)).toDateString()}</td>
                                <td> {_route.routeType.startingLocation} </td>
                                <td> {_route.routeType.destination} </td>









                            </tr>))}
                        </tbody>


                    </Table>

                </div>
            )
        }
    }
}