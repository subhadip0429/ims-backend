import {readFileSync} from "fs-extra";
export class Config {
    private readonly data:any;
    constructor(configName: string) {
        try{
            let configData = readFileSync(`./configs/${configName}.json`).toString();
            this.data = JSON.parse(configData);
        }catch (e){
            console.log("Error in reading config file");
            console.log(e);
            this.data = {};
        }
    }

    get(key:string, defaultValue:any = null) {
        let keySet = key.split('.');
        let configData = this.data;
        for (let k of keySet){
            if(configData[k]){
                configData = configData[k];
            }else{
                return defaultValue;
            }
        }
        return  configData;
    }
    getAll(){
        return this.data;
    }
}
