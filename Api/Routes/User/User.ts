var express = require("express");
var router = express.Router();
import { CreateUser, getOneUser } from "../../Controller/Users/UserCrud";
import { checkPassword } from "../../Controller/Auth/Auth";
const { generateToken, verifyToken } = require('../../Controller/Auth/Token');

router.get("/", async (req: any, res: any) => {
    
});

router.post("/", async (req: any, res: any) => {
    const firstName = req.body.firstName
    const lasName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    if(firstName && lasName && email && password) {
        const userCreation = await CreateUser({
            firstName: firstName,
            lastName: lasName,
            email: email,
            password: password
        })
        res.send(userCreation)
    }
    else {
        res.send({
            status:false,
            message:"Informations manquante."
        })
    }
});
router.post("/login", async (req: any, res: any) => {
    const email = req.body.email
    const password = req.body.password

    const user = (await getOneUser(email)).data
    if(user) {
        const passwordVerification = (await checkPassword(user, password)).status
        if(passwordVerification) {
            const token = generateToken(user);

            res.send({
                status:true,
                message:"Identifiants correct.",
                token:token
            })
        }
        else {
            res.send({
                status:false,
                message:"Identifiants incorrect."
            })
        }
    }
    else {
        res.send({
            status:false,
            message:"Identifiants incorrect."
        })
    }
});
router.put("/", async (req: any, res: any) => {
    
});

router.delete("/", async (req: any, res: any) => {
    
});




module.exports = router;