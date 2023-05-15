import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateChocolate = () => {
    const chocolate = useLoaderData()
    const { _id, name, country, category } = chocolate;

    const [selectedOption, setSelectedOption] = useState('Select One');

    const handleUpdateChocolate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const country = form.country.value;
        const updatedChocolate = { name, country, selectedOption }
        // console.log(updatedChocolate);

        fetch(`http://localhost:5000/chocolates/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedChocolate)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    Swal.fire(
                        'Good job!',
                        'Chocolate Updated Successfully!',
                        'success'
                    )
                }
            })
    }
    return (
        <>
            <div className="my-10 container mx-auto">
                <Link to='/'><button className="btn btn-outline ml-10">All Chocolates</button></Link>
            </div>
            <div className="p-10 bg-slate-100 mx-10 rounded mb-10">
                <div className="text-center">
                    <h2 className="text-xl font-bold my-5">New Chocolate</h2>
                    <p>Use the below form to create a new product</p>
                </div>
                <form onSubmit={handleUpdateChocolate}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={name} name="name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Country</span>
                        </label>
                        <input type="text" defaultValue={country} name="country" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select className="select select-bordered" name="category" defaultValue={category} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            <option disabled defaultValue>Select One</option>
                            <option>Normal</option>
                            <option>WonderLand</option>
                            <option>Premium</option>
                            <option>Choco Factory</option>
                        </select>
                    </div>
                    <input className="btn bg-amber-900 w-full mt-8" type="submit" value="Update" />
                </form>
            </div>
        </>
    );
};

export default UpdateChocolate;