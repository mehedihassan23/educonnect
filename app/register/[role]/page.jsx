

import SignupForm from "./_components/SignupForm"


const RegisterPage = ({params}) => {
  return (
    <>
      <div className="w-full flex-col h-screen flex items-center justify-center">
        <div className="container">
            <SignupForm params={params}/>
        </div>
      </div>
    </>
  )
}

export default RegisterPage

