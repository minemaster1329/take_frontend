import {Link, useLocation} from "react-router-dom";
import {Car, CarIdOnly} from "./Car";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";

export default function EditCar() {
    const {state} = useLocation();
    const {carId} = state as CarIdOnly

    const [brand, setBrand] = useState("")
    const [licencePlateNr, setLicencePlateNr] = useState("")
    const [ownerFirstLastName, setOwnerFirstLastName] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")

    const [carCopy, setCarCopy] = useState<Car>();

    useEffect(() => {
        const fetchClient = async () => {
            await fetch(`http://localhost:8080/take_project-1.0-SNAPSHOT/api/car/${carId}`).then(response => {
                if (response.ok){
                    return response.json();
                }
            })
                .then(responseJson => {
                    let car = responseJson as Car
                    setCarCopy(car);
                    setBrand(car.brand)
                    setLicencePlateNr(car.licensePlateNr)
                    setOwnerFirstLastName(car.ownerFirstLastName)
                    setTelephoneNumber(car.telephoneNr)
                })
        }

        fetchClient();
    }, [carId])

    const handleSubmit = async () => {
        const car: Car = {
            id: carId,
            brand: brand,
            licensePlateNr: licencePlateNr,
            ownerFirstLastName: ownerFirstLastName,
            telephoneNr: telephoneNumber
        }
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/car/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok){
                    alert("Car edited successfully");
                }

                else alert("Something went wrong when saving changes");
            })
        ;    }

    const handleReset = () => {
        if (carCopy !== undefined){
            setBrand(carCopy.brand);
            setLicencePlateNr(carCopy.licensePlateNr);
            setOwnerFirstLastName(carCopy.ownerFirstLastName);
            setTelephoneNumber(carCopy.telephoneNr);
        }
    }

    return(
        <div>
            <h1>Edit car {carId}</h1>
            <Form className='form col-5'>
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
                    <Label for={"licencePlateNr"}>Licence plate nr.</Label>
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
                    <Label for={"ownerFirstLastName"}>Owner</Label>
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