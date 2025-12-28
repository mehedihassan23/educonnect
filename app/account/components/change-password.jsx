"use client"
import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({email}) => {
    const [passwordState, setPasswordState] = useState({
        "oldPassword": "",
        "newPassword":"",
        "confirmPassword":""
    })
    const handleChange = (event) => {
        setPasswordState({...passwordState, [event.target.name] : event.target.value})
    }
    const doPasswordChange = async (event) => {
        event.preventDefault()
        if(passwordState.newPassword != passwordState.confirmPassword){
            toast.error("Mismatch new and confirm password")
            return null;
        }

        try {
            await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword)
            toast.success("Password change successfully!")
        } catch (error) {
            toast.error("something went wrond")
        }
         
    }
  return (
    <>
      <div>
        <h5 className="text-lg font-semibold mb-4">
            Change password :
        </h5>
        <form onSubmit={doPasswordChange}>
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <Label className="mb-2 block">Old password :</Label>
                    <Input
                        type="password"
                        placeholder="Old password"
                        required
                        name="oldPassword"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label className="mb-2 block">New password :</Label>
                    <Input
                        type="password"
                        placeholder="New password"
                        required
                        name="newPassword"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label className="mb-2 block">
                        Re-type New password :
                    </Label>
                    <Input
                        type="password"
                        placeholder="Re-type New password"
                        required
                        name="confirmPassword"
                        onChange={handleChange}
                    />
                </div>
            </div>
            {/*end grid*/}
            <Button className="mt-5" type="submit">
                Save password
            </Button>
        </form>
    </div>
    </>
  )
}

export default ChangePassword
