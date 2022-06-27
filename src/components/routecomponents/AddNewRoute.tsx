import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";
import {FetchError} from "../FetchError";

//import {Package} from "../packagecomponents/Package";
import {Car} from "../carcomponents/Car";
import {DefinedRoute} from "../definedroutecomponents/DefinedRoute";
import {RouteClass} from "./RouteClass";
import {HelperRouteClass} from "./HelperRouteClass";


export default function AddNewRoute() {
    const [date, setDate] = useState<string>("")
    const [carID, setCarID] = useState(0)
    const [definedRouteID, setDefinedRouteID] = useState(0)

    const [cars, setCars] = useState<Car[]>([])
    const [definedRoutes, setDefinedRoutes] = useState<DefinedRoute[]>([])

    const [fetchError, setFetchError] = useState<FetchError>({
        didHappened: false,
        errorCode: 200,
        errorMessage: ""
    });
    const [loading, setLoading] = useState<boolean>(true);

    const [carDropDownOpen, setCarDropDownOpen] = useState(false);
    const [definedRouteDropDownOpen, setDefinedRouteDropDownOpen] = useState(false);
    const toggleCar = () => setCarDropDownOpen(prevState => !(prevState));
    const toggleDefinedRoute = () => setDefinedRouteDropDownOpen(prevState => !(prevState));

    // function is called only once
    useEffect(
        () => {
            fetchCars();
            fetchDefinedRoute();
        }, []
    )

    const fetchCars = async () => {
        await fetch('http://localhost:8080/take/api/car/getall', {
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
                setCars(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }

    const fetchDefinedRoute = async () => {
        await fetch('http://localhost:8080/take/api/definedRoute/getall', {
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
                setDefinedRoutes(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }


    const handleSubmit = async () => {
        let newRoute: HelperRouteClass = {
            id: 0,
            date: date,
            carId: carID,
            definedRouteId: definedRouteID
        }

        await fetch('http://localhost:8080/take/api/route/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRoute)
        })
            .then(response => {
                if (response.ok) {
                    alert("Route added successfully.");
                } else {
                    alert("Error when adding Route.")
                }
            })
        ;
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
                    <h1>
                        Add new route to the system.
                    </h1>
                    <Form className="form col-5">

                        <FormGroup className="m-2">
                            <Label for={"date"}>Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                value={date}
                                placeholder={"ex. DD-MM-YYYY"}
                                onChange={e => setDate(e.target.value)}
                            />
                        </FormGroup>

                        <Dropdown isOpen={carDropDownOpen} toggle={toggleCar} className="m-2">
                            <DropdownToggle caret>
                                Choose Car
                            </DropdownToggle>
                            <DropdownMenu>
                                {cars.map(car => (
                                    <DropdownItem onClick={() => setCarID(car.id)}>{car.licensePlateNr}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown isOpen={definedRouteDropDownOpen} toggle={toggleDefinedRoute} className="m-2">
                            <DropdownToggle caret>
                                Choose Defined Route
                            </DropdownToggle>
                            <DropdownMenu>
                                {definedRoutes.map(defRoute => (
                                    <DropdownItem
                                        onClick={() => setDefinedRouteID(defRoute.id)}>{defRoute.startingLocation}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <FormGroup>
                            <Button className='btn btn-success mx-2' onClick={handleSubmit}>Submit</Button>
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }
}