import {useEffect, useState} from "react";
import {Car} from "./Car";
import {Link, useNavigate} from "react-router-dom";
import {Button, Table} from "reactstrap";

export default function CarsOverview(){
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/car/getall').then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error("Something went wrong when fetching data!");
        })
            .then(responseJson => {
                setLoading(false)
                setCars(responseJson);
            })
            .catch((reason) => {
                setLoading(false)
            })
    }

    const navigate = useNavigate();

    const handleDelete = async (clientId: number) => {
        await fetch(`http://localhost:8080/take_project-1.0-SNAPSHOT/api/car/delete/${clientId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) alert("Car removed successfully");
                else alert("Something went wrong!")
            })
        setCars([]);
        await fetchData();
    }

    const handleEdit = async(carId: number) => {
        navigate('/editcar', {state: {carId: carId}})
    }

    const handleDetails = async(carId: number) => {
        navigate('/cardetails', {state: {carId: carId}})
    }

    if (loading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    else {
        return(
            <div>
                <h1>Cars overview:</h1>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Licence plate number</th>
                        <th>Owner</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.licensePlateNr}</td>
                            <td>{car.ownerFirstLastName}</td>
                            <td>{car.telephoneNr}</td>
                            <td>
                                <Button className='btn btn-primary mx-2' onClick={() => handleDetails(car.id)}>Details</Button>
                                <Button className='btn btn-primary mx-2' onClick={() => handleEdit(car.id)}>Edit</Button>
                                <Button className='btn btn-primary mx-2' onClick={() => handleDelete(car.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Link to='/addnewcar'>Add new car</Link>
            </div>
        )
    }
}