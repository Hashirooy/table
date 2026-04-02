import type { User } from "../../entities/User/model/types/userSchema";

export const filteredUsersFunc =(arr: User[], search: string)=>{
    if(!search){
        return arr;
    }
    const q = search.toLowerCase();
    return arr.filter((user)=>{
        return user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
    }) 
}

    