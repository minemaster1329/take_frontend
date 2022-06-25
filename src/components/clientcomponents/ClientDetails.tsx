import {useLocation} from "react-router-dom";
import {Client, ClientIdOnly} from "./Client";
import {useEffect, useState} from "react";
import {FetchError} from "../FetchError";
import {route} from "../packagecomponents/Package";
import {Table} from "reactstrap";

export default function ClientDetails() {
    const {state} = useLocation();
    const {clientId} = state as ClientIdOnly

    const [fetchError, setFetchError] = useState<FetchError>({didHappened: false, errorCode: 200, errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);
    const [packages, setPackages] = useState<route[]>([])

    useEffect(() => {
        const fetchPackages = async () => {
            // TODO - got not clue why URI doesn't work with our server - works with Postman
            await fetch(`http://localhost:8080/take_project-1.0-SNAPSHOT/api/clientPackage/clientId/${clientId}`, {
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
                    setPackages(responseJson);
                })
                .catch((reason) => {
                    setLoading(false)
                    setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
                })
        }

        fetchPackages();
    }, [clientId])

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
        }

        else {
            return (
                <div>
                    <h1>Client {clientId} Packages</h1>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Weight</th>
                            <th>Is paid for?</th>
                            <th>Price</th>
                            <th>Estimated Delivery</th>
                            <th>Delivery Address</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packages.map(_package => (
                            <tr key={_package.type}>
                                <td>{_package.weight}</td>
                                <td>{_package.paidFor}</td>
                                <td>{_package.price}</td>
                                <td>{Date.parse(_package.estimatedDeliveryDate)}</td>
                                <td>{_package.deliveryAddress}</td>
                            </tr>))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}