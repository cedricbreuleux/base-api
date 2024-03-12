import { PrismaClient } from "@prisma/client";
import { CreateHashedPassword } from "../Auth/Auth";

const Prisma = new PrismaClient();

export interface UserObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
// creer un utilisateur
export async function CreateUser(User: UserObject) {
    try {
        User.password = await CreateHashedPassword(User.password);
        const nUser = await Prisma.user.create({data:User});
        
        return {
            status:true,
            message:null,
            data:nUser,
        }
    } catch (error) {
        return {
            status:false,
            message: "Une erreur est survenu lors de la creation d'un utilisateur.",
            data:null,
        }
    }
}
// Recupere tous les utilisateurs
export async function getUser() {
    try {
        const Gusers = await Prisma.user.findMany()
        
        return {
            status:true,
            message:null,
            data:Gusers,
        }
    } catch (error) {

        return {
            status:false,
            message: "",
            data:null,
        }
    }
}

// Recupere un utilisateur
export async function getOneUser(UserEmail:string) {
    try {
        const Guser = await Prisma.user.findFirst({
            where: { email: UserEmail },
          });
        

        return {
            status:true,
            message:null,
            data:Guser,
        }
    } catch (error) {
        return {
            status:false,
            message: "Erreur lors de la recuperation d'un utilisateur.",
            data:null,
        }
    }
}

// Met à jour un utilisateur
export async function updateUser(UserId:number, UserInfoUpdate:UserObject) {
    try {
        const Uuser = await Prisma.user.update({
            where: {id: UserId},
            data: UserInfoUpdate
        })
        
        return {
            status:true,
            message:null,
            data:Uuser,
        }
    } catch (error) {
        return {
            status:false,
            message: "Une erreur est survenu lors de la mise à jour de l'utilisateur.",
            data:null,
        }
    }
}

// Supprime un utilisateur
export async function deleteUser(UserId:number) {
    try {
        const Duser = await Prisma.user.delete({
            where:{id:UserId}
        })
        
        return {
            status:true,
            message:null,
            data:Duser,
        }
    } catch (error) {
        return {
            status:false,
            message: "Erreur lors de la suppression d'un utilisateur",
            data:null,
        }
    }
}