import { connectToMongoDb } from "@utils/database";
import Prompt  from "@models/prompt";



export const POST = async (req) => {
    try{
        await connectToMongoDb();
        const {userId,prompt,tag} = await req.json();
        console.log("User Id"+userId);
        console.log("prompt"+prompt);
        const newPrompt=new Prompt({creator:userId,prompt,tag});
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201});
    }catch(error){
        console.log("error:: error>"+error);
        return new Response('failed create new Prompt 📛',{status:500});
    }
}

