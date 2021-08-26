import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ContextI } from "../../interfaces/RequestHandler";
import { GraphQLUpload } from 'graphql-upload'
import {createWriteStream} from 'fs'
import { IfileImage } from "../../interfaces/IfileImage";
import { User } from "../../entities/user";
import { isAuthenticated } from "../../middlewares/auth";
import { FileImage } from "../../entities/fileImages";



@Resolver()
export class fileImage {

//   @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg("picture", () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: IfileImage,
  @Ctx() context: ContextI): Promise<boolean> {

    console.log(createReadStream());
    
    // const user = User.findOne({id: context.res.locals.userLogin.id})


    // const img = FileImage.create({
    //     filename,

    // })



    return new Promise(async (resolve, reject) =>


      


        createReadStream()
        .pipe(createWriteStream(__dirname + `/../../files/imgsProfiles/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    )
  }
}


