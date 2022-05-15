import {useLocation} from "react-router-dom";
import {ClientIdOnly} from "./Client";

export default function ClientDetails() {
    const location = useLocation()
    const {clientId} = location.state as ClientIdOnly
    return (
        <h1>Client {clientId}</h1>
    )
}