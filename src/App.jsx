import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import ChocolateCard from './components/ChocolateCard';
import { useState } from 'react';

function App() {
  const loadedChocolates = useLoaderData();
  const [chocolates, setChocolates] = useState(loadedChocolates)

  return (
    <>
      <div className='container mx-auto px-10'>
        <Link to='/addChocolate'><div className="btn btn-outline mb-10">+ New Chocolate</div></Link>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Country/Factory</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            {
              chocolates.map(chocolate => <ChocolateCard key={chocolate._id} chocolate={chocolate} chocolates={chocolates} setChocolates={setChocolates}></ChocolateCard>)
            }
          </table>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default App
