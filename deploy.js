//  const ethers =require("ethers");
import { ethers } from "ethers";
//  const fs= require("fs-extra");
import pkg from "fs-extra";
const {fs}=pkg;
// require("dotenv").config();
import 'dotenv/config'


 
 
 async function main(){

    // const provider = new ethers.providers.JsonRPCProvider("HTTP://127.0.0.1:7545");
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(
        // "0x59e3bec1f3082c6c75d9ef37239e09f9553e968aa5392e077a96d8cf0e802cd4",
        process.env.PRIVATE_KEY,provider
    );


    const abi =fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
    const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"   
    );
const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
console.log("Deploying");
const contract =await contractFactory.deploy();  //stop here wait for deploying 
// console.log(contract) ;
await contract.deploymentTransaction.wait(1);
//get number 
const currentFavouriteNumber =await contract.retrieve();
console.log(`current Favourite Number : ${currentFavouriteNumber.toString()}`);
const transactionresponse=await contract.store("7");
const transactionReceipt= await transactionresponse.wait(1);
const updatedFavouriteNumber = await contract.retrieve();
console.log(`updated favourite number is: ${updatedFavouriteNumber}`);
 }

 main()
 .then(()=>process.exit(0))
 .catch((error)=>{
    console.error(error);
    process.exit(1);
 });