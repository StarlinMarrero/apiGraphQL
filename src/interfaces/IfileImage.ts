  
import { Stream } from "stream";
import { Field, InputType } from "type-graphql";


export interface IfileImage {

   
  id: string
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}