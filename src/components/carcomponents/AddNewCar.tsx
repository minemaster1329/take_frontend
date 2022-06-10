import {useState} from "react";

import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Car} from "./Car";

export default function AddNewCar(){
    const [brand, setBrand] = useState("")
    const [licencePlateNr, setLicencePlateNr] = useState("")
    const [ownerFirstLastName, setOwnerFirstLastName] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")



    const handleSubmit = async () => {
        let client: Car = {
            id: 0,
            brand: brand,
            licensePlateNr: licencePlateNr,
            ownerFirstLastName: ownerFirstLastName,
            telephoneNr: telephoneNumber
        }

        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/car/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                if (response.ok){
                    alert("Car added successfully");
                }
                else {
                    alert("Error when adding client")
                }
            });
    }

    const handleReset = () => {
        setLicencePlateNr("");
        setOwnerFirstLastName("");
        setBrand("");
        setTelephoneNumber("");
    }

    return (
        <div>
            <h1>
                Add new car to system
            </h1>
            <Form className="form col-5">
                <FormGroup className="m-2">
                    <Label for={"brand"}>Brand</Label>
                    <Input
                        type="text"
                        name="brand"
                        id="brand"
                        value={brand}
                        placeholder={"ex. Reichwagen"}
                        onChange={e => setBrand(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"licencePlateNr"}>Licence plate number</Label>
                    <Input
                        type="text"
                        name="licencePlateNr"
                        id="licencePlateNr"
                        value={licencePlateNr}
                        placeholder={"ex. WGW XXXXXX"}
                        onChange={e => setLicencePlateNr(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"address"}>Owner</Label>
                    <Input
                        type="text"
                        name="ownerFirstLastName"
                        id="ownerFirstLastName"
                        value={ownerFirstLastName}
                        placeholder={"ex. Jane Doe"}
                        onChange={e => setOwnerFirstLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"telephoneNumber"}>Telephone Number</Label>
                    <Input
                        type="text"
                        name="telephoneNumber"
                        id="telephoneNumber"
                        value={telephoneNumber}
                        placeholder={"ex. 000000000"}
                        onChange={e => setTelephoneNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button className='btn btn-success mx-2' onClick={handleSubmit}>Submit</Button>
                    <Button className='btn btn-danger  mx-2' onClick={handleReset}>Clear</Button>
                </FormGroup>
            </Form>
            <Link to='/carsoverview'>Back to cars overview</Link>
        </div>
    )
}