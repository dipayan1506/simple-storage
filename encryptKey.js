// const ethers = require("ethers");
import { ethers } from "ethers";
import pkg from "fs-extra";
const {fs}=pkg;

// const fs = require("fs-extra");
// require("dotenv").config();
import 'dotenv/config'

async function main(){
       
    const wallet = new ethers.Wallet(process.env.PRIVAT_KEY);
    const encryptedJsonKey= await ethers.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    );
    console.log(encryptedJsonKey);
    fs.writefileSync("./.encryptedKey.json",encryptedJsonKey);
    



}
 
main()
.then(()=>process.exit(0))
.catch((error)=>{
    // console.errror(error);
    process.exit(1);
})