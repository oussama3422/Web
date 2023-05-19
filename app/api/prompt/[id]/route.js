import { connectToMongoDb } from "@utils/database";
import Prompt  from "@models/prompt";
//GET (read)
export const GET = async(req,{params})=>{
    try{
      await connectToMongoDb();
      
      const prompt=await Prompt.findById(params.id).populate('creator');
      if(!prompt) return new Response(JSON.stringify('prompt Not Found'),{status:401})
      return new Response(JSON.stringify(prompt),{status:200})
    }catch(error){
        return new Response("failed to fetch all prompt",{status:500})
    }
}

//PATCH (update)
export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json();

    try{
      await connectToMongoDb();
      const existingPrompt = Prompt.findById(params.id);
      if(!existingPrompt) return new Response("Prompt not found",{status:404});
      existingPrompt.prompt=prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response(existingPrompt,{status:201});
    }catch(error){
     return new Response("Failed to update the prompt",{status:500});
    }
}

//DELETE (delete)
export const DELETE = async(req,{params})=>{
    const {prompt,tag} = await req.json();
    try{
      await connectToMongoDb();
      const existingPrompt = Prompt.findByIdAndRemove(params.id);
      return new Response("Prompt has been deleted sucessfully",{status:200});
    }catch(error){
      return new Response("Failed to delete the prompt",{status:500});
    }
}
