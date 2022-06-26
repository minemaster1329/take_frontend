import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {DefinedRoute} from "./DefinedRoute";

export default function AddNewDefinedRoute() {
    const [startingLocation, setStartingLocation] = useState("")
    const [destination, setDestination] = useState("")
    const [distanceKM, setDistanceKM] = useState(0)

    const handleSubmit = async () => {
        let definedRoute: DefinedRoute = {
            id: 0,
            startingLocation: startingLocation,
            destination: destination,
            distanceKM: distanceKM,
        }

        //'http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/addnew'
        await fetch('http://localhost:8080/take/api/definedRoute/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(definedRoute)
        })
            .then(response => {
                if (response.ok){
                    alert("Route added successfully");
                }
                else {
                    alert("Error when adding new defined route")
                }
            });
    }

    const handleReset = () => {
        setStartingLocation("");
        setDestination("");
        setDistanceKM(0);
    }

    return (
        <div>
            <h1>
                Add new Defined Route to system
            </h1>
            <Form className="form col-5">
                <FormGroup className="m-2">
                    <Label for={"startingLocation"}>Starting location</Label>
                    <Input
                        type="text"
                        name="startingLocation"
                        id="startingLocation"
                        value={startingLocation}
                        placeholder={"ex. Katowice"}
                        onChange={e => setStartingLocation(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"destination"}>Destination</Label>
                    <Input
                        type="text"
                        name="destination"
                        id="destination"
                        value={destination}
                        placeholder={"ex. Wroclaw"}
                        onChange={e => setDestination(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"distanceKM"}>Distance [KM]</Label>
                    <Input
                        type="number"
                        name="distanceKM"
                        id="distanceKM"
                        value={distanceKM}
                        placeholder={"ex. 20"}
                        onChange={e => setDistanceKM(parseInt(e.target.value))}
                    />
                </FormGroup>
                <FormGroup>
                    <Button className='btn btn-success mx-2' onClick={handleSubmit}>Submit</Button>
                    <Button className='btn btn-danger  mx-2' onClick={handleReset}>Clear</Button>
                </FormGroup>
            </Form>
            <Link to='/definedroutesoverview'>Back to defined routes overview</Link>
        </div>
    )
}