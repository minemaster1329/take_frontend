import {useLocation} from "react-router-dom";
import {CarIdOnly} from "./Car";

export default function CarDetails() {
    const location = useLocation()
    const {carId} = location.state as CarIdOnly
    return (
        <h1>Car {carId}</h1>
    )
}