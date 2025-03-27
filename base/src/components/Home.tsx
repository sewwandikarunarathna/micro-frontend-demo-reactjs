import UserService from "../services/UserService";
import withAuth from "../utils/WithAuth";
import SharedButton from "../shared-components/atoms/SharedButton/SharedButton"

const Home = () => {
  const userService = new UserService();

  const getUsersViaInterceptor = async() => {
    const response = await userService.getUsers();
    console.log('response', response);
  }

  return (
  <>

  <h1 className="text-2xl text-center mt-10">🏠 Home Page</h1>
  <div className="p-40 bg-red-200">
  <h1>You're in home page</h1>  
  <SharedButton children="Get Users" onClick={getUsersViaInterceptor} />
  </div>
  </>
  )
}

export default  withAuth(Home);
