export interface User {
    properties: {
        id: string;
        email: string;
        password: string;
        isActivated: boolean;
        roles: string[];
        name: string;
        department: string;
        date:string;
        role:string;
        status:string;
    }
}