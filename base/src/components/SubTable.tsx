import { Link, useLocation, useParams } from 'react-router-dom'

type tblProps = {
  name: string;
}
const SubTable = () => {
  const { id } = useParams();
  const { data } = useLocation().state;
console.log('state',data);

  return (
    <div className="text-center mt-10">
    <h1 className="text-3xl">Data from Table</h1>
    <h2 className="text-2xl">User ID: {id}</h2>
    <h2 className="text-2xl">User Full Name: {data.name}</h2>
    <Link to="/table" className="text-blue-500">Go Back</Link>
  </div>
  )
}

export default SubTable
