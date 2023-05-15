import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ChocolateCard = ({ chocolate, chocolates, setChocolates }) => {
    const { _id, name, country, category } = chocolate;

    const handleDelete = _id => {
        // console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/chocolates/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                              Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                        }
                        const remaining = chocolates.filter(choco => choco._id !== _id)
                        setChocolates(remaining)
                    })
            }
        })
    }
    return (
        <>
            <tbody>
                <tr>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="font-bold">{name}</div>
                    </td>
                    <td>
                        <div className="text-sm">{country}</div>
                    </td>
                    <td>{category}</td>
                    <th className='flex items-center gap-5'>
                        {/* <Link to={`updateChocolate/${_id}`}> */}
                        <Link to={`/updateChocolate/${_id}`}><button className="btn btn-square">Edit</button></Link>
                        {/* </Link> */}
                        <button onClick={() => handleDelete(_id)} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </th>
                </tr>
            </tbody>
        </>
    );
};

export default ChocolateCard;