import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";
import {route} from "./Package";
import {FetchError} from "../FetchError";
import {Client} from "../clientcomponents/Client";
import {RouteClass} from "../routecomponents/RouteClass";
import {HelperRouteClass} from "../routecomponents/HelperRouteClass";

export default function AddNewPackage() {
    const [deliveryAddress, setDeliveryAddress] = useState<string>("")
    const [weight, setWeight] = useState<number>(0)
    const [type, setType] = useState<string>("")
    const [isPaidFor, setIsPaidFor] = useState<boolean>(false)
    const [price, setPrice] = useState<number>(0)
    const [estimatedDate, setEstimatedDate] = useState<string>("")
    const [ownerID, setOwnerID] = useState(0)
    const [routeID, setRouteID] = useState(0)

    const [clients, setClients] = useState<Client[]>([])
    // const [routes, setRoutes] = useState<RouteClass[]>([])
    const [routes, setRoutes] = useState<HelperRouteClass[]>([])

    const [fetchError, setFetchError] = useState<FetchError>({
        didHappened: false,
        errorCode: 200,
        errorMessage: ""});
    const [loading, setLoading] = useState<boolean>(true);

    const [clientDropDownOpen, setClientDropDownOpen] = useState(false);
    const [routeDropDownOpen, setRouteDropDownOpen] = useState(false);
    const toggleClient = () => setClientDropDownOpen(prevState => !(prevState));
    const toggleRoute = () => setRouteDropDownOpen( prevState => !(prevState));

    // function is called only once
    useEffect(
        () => {
            fetchRoutes();
            fetchClients();
        }, []
    )

    const fetchRoutes = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/route/getall', {
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
                setRoutes(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }

    const fetchClients = async () => {
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
                setClients(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
                setFetchError({didHappened: true, errorCode: -1, errorMessage: reason.toString()})
            })
    }




    const handleSubmit = async () => {
        let clientPackage: route = {
            type: type,
            deliveryAddress: deliveryAddress,
            weight: weight,
            paidFor: isPaidFor,
            price: price,
            estimatedDeliveryDate: estimatedDate,
            routeCarId: ownerID,
            definedRouteId: routeID
        }

        //'http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/addnew'
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/clientPackage/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientPackage)
        })
            .then(response => {
                if (response.ok){
                    alert("Package added successfully.");
                }
                else {
                    alert("Error when adding package.")
                }
            });
    }

    /*
    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setAddress("");
        setTelephoneNumber("");
    }
    */

    if (loading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    else {
        if (fetchError.didHappened) {
            return (
                <div>
                    <h1>Something went wrong when fetching data!</h1>
                    <p>Status code: {fetchError.errorCode}</p>
                    <p>Message: {fetchError.errorMessage}</p>
                </div>
            )
        }
        else{
            return (
            <div>
                <h1>
                    Add new package to the system.
                </h1>
                <Form className="form col-5">
                    <FormGroup className="m-2">
                        <Label for={"type"}>Type</Label>
                        <Input
                            type="text"
                            name="type"
                            id="type"
                            value={type}
                            placeholder={"ex. small/medium/big"}
                            onChange={e => setType(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label for={"deliveryAddress"}>Delivery Address</Label>
                        <Input
                            type="text"
                            name="deliveryAddress"
                            id="deliveryAddress"
                            value={deliveryAddress}
                            placeholder={"ex. Doey St. 9"}
                            onChange={e => setDeliveryAddress(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label for={"weight"}>Weight</Label>
                        <Input
                            type="number"
                            name="weight"
                            id="weight"
                            value={weight}
                            placeholder={"ex. 10.0"}
                            onChange={e => setWeight(parseInt(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label for={"price"}>Price</Label>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            placeholder={"ex. 15.0"}
                            onChange={e => setPrice(parseInt(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label for={"date"}>Estimated Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="date"
                            value={estimatedDate}
                            placeholder={"ex. DD-MM-YYYY"}
                            onChange={e => setEstimatedDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label check>
                            <Input
                                type="checkbox"
                                id="checkbox2"
                                defaultChecked={isPaidFor}
                                onChange={() => setIsPaidFor(!isPaidFor)}
                            />{' '}
                            Is paid for?
                        </Label>
                    </FormGroup>

                    <Dropdown isOpen={clientDropDownOpen} toggle={toggleClient}>
                        <DropdownToggle caret>
                            Choose Client
                        </DropdownToggle>
                        <DropdownMenu>
                            {clients.map(client => (
                                <DropdownItem onClick={()=>setOwnerID(client.id)}>{client.firstName}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={routeDropDownOpen} toggle={toggleRoute}>
                        <DropdownToggle caret>
                            Choose Route
                        </DropdownToggle>
                        <DropdownMenu>
                            {routes.map(route => (
                                <DropdownItem onClick={()=>setRouteID(route.id)}>{route.date}</DropdownItem>
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