import { connectToMongoDb } from "@utils/database";
import Prompt  from "@models/prompt";



export const POST = async (req,res) => {
    console.log("req.json() :::> "+req.json());
    const {userId,prompt,tag} = await req.json();
    try{
        await connectToMongoDb();
        const newPrompt=new Prompt({creator:userId,prompt,tag});
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201});
    }catch(error){
        console.log("error:: error>"+error);
        return new Response('failed create new Prompt 📛',{status:500});
    }
}

