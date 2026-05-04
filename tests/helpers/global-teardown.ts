import { FullConfig } from "playwright/types/testReporter";
import {exec} from "child_process"
import { stderr, stdout } from "process";

export default async function globaslTeardown(config:FullConfig) {
    console.log(`[Info] : Starting the teardown setup`)
    if(process.env.RUNNER?.toUpperCase()==="LOCAL"){
       console.log(`[Info] : Local run detected`)
       exec("allure serve", (error, stdout,stderr)=>{
        if(error){
            console.error("ERROR: Starting allure server:", error.message)
        }
       }) 
    }
    
}