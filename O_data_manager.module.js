import { s_directory_separator } from "./constants.module.js";
import {sleep} from "https://deno.land/x/sleep@v1.2.0/mod.ts";
import {
    ensureDir,
    ensureFile,
  } from "https://deno.land/std@0.77.0/fs/mod.ts";

class O_data_manager_json_file{
    constructor(o_instance){

        this.s_file_name = import.meta.url.split(s_directory_separator).pop()
        this.s_path_name = `.${s_directory_separator}.${this.s_file_name.split(".").shift()}`
        this.s_file_name_suffix = ".json"
        this.s_file_name_prefix = "A_"
        this.s_path_name_models = "."+s_directory_separator

        this.a_o = []
        this.o_instance = o_instance

        var a_s_class_names_not_allowed = [
            "Object", 
            "Array", 
            "Number", 
            "String"
        ];
        if(
            a_s_class_names_not_allowed.includes(o_instance.constructor.name)
            ){
            console.error('the object cannot be instance of one of the following classes ' + a_s_class_names_not_allowed.join(","));
            exit();
        }
        this.O_model = o_instance.constructor;
        this.s_file_name = this.s_file_name_prefix + this.O_model.name.toLowerCase() + this.s_file_name_suffix;
        this.s_path_name_file_name = `${this.s_path_name}${s_directory_separator}${this.s_file_name}`

    }
    async f_read_file(
    ){
        
        await ensureDir(this.s_path_name)
        await ensureFile(this.s_path_name_file_name);
        // console.log(s_path_name_file_name)
        
        this.s_json = await Deno.readTextFile(this.s_path_name_file_name);
        try {
            this.a_o = JSON.parse(this.s_json);
        } catch (error) {
            console.log(error)
            console.log(this.s_json)
            this.a_o = []
        }
        return this.a_o
    }
    async f_write_file(
    ){
        
        await ensureDir(this.s_path_name)
        await ensureFile(this.s_path_name_file_name);
        // console.log(this.a_o)        
        try {
            Deno.writeTextFileSync(this.s_path_name_file_name, JSON.stringify(this.a_o))
        } catch (error) {
            return e
        }
        return this.a_o;
    }

}
class O_data_manager{
    constructor(){
    }
    async f_a_o_read(o_instance){
        var o_data_manager_json_file = new O_data_manager_json_file(o_instance)
        return await o_data_manager_json_file.f_read_file()
        // return o_data_manager_json_file.a_o;
    }
    async f_a_o_write(o_instance){
        var o_data_manager_json_file = new O_data_manager_json_file(o_instance)
        await o_data_manager_json_file.f_read_file()
        o_data_manager_json_file.a_o.push(o_instance);
        return await o_data_manager_json_file.f_write_file()
    }

    async f_o_create(
        o_instance,
        s_prop_name_id = 'n_id'
    ){

        var a = await this.f_a_o_read(o_instance);
        const b_property_n_id_exists = o_instance.hasOwnProperty(s_prop_name_id);
    
        if(b_property_n_id_exists){
            
            var n_id_max = parseInt(Math.max(0,...a.map(o=>parseInt(o[s_prop_name_id]))))
            // console.log(n_id_max)
            o_instance[s_prop_name_id] = n_id_max+1        
        }

        this.f_a_o_write(o_instance);
        return o_instance
    }
    //     f_a_o_read(
    //         s_model_name,
    //         o_input
    // ){

        
    //     if(!){
    //         const o_bash_command = await f_o_bash_command(s_command)
    //         a_o_bash_command.push(o_bash_command)
    //         var s_json = JSON.stringify(a_o_bash_command)
    //         await Deno.writeTextFile(s_path_name_file_name, s_json);
    //     }
    //     return a_o_output;
    // }
    // f_a_o_update(
    //     s_model_name,
    //     o_input
    // ){
        
    //     return a_o_output;
    // }
    // f_a_o_delete(
    //     s_model_name,
    //     o_input
    // ){
        
    //     return a_o_output;
    // }
}

export {O_data_manager}