"use server"

import { User } from "@/models/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"
import { validatePassword } from "@/queries/users";

export async function updateUserInfo(email, updatedData) {
    try {
      await User.findOneAndUpdate({email: email}, updatedData)
      revalidatePath('/account');
    } catch (error) {
        
    }
    
}


export async function changePassword(email, oldPassword, newPassword) {
    const isMatch = await validatePassword(email, oldPassword);

    if (!isMatch) {
        throw new Error("Please enter a valid current password");
    }

    const filter = {email: email};

    const hashedPassword = await bcrypt.hash(newPassword, 5);

    const dataToUpdate = {
        password: hashedPassword
    }

    try{
        await User.findOneAndUpdate(filter, dataToUpdate);
        revalidatePath('/account');
    } catch(error) {
        throw new Error(error);
    }

}