import { connectToMongoDb } from "@utils/database";
import Prompt  from "@models/prompt";


export const GET = async(req,{params})=>{
    try{
      await connectToMongoDb();
      
      const prompts=await Prompt.find({
        creator:params.id
      }).populate('creator');
      return new Response(JSON.stringify(prompts),{status:200})
    }catch(error){
        return new Response("failed to fetch all prompt",{status:500})
    }
}