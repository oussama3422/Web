import { connectToMongoDb } from "@utils/database";
import Prompt  from "@models/prompt";



export const POST = async (req) => {
    try{
        const data = await req.json();
        const [userId, prompt, tag] = data;
        console.log("error::>"+tag);
        await connectToMongoDb();
        const newPrompt=new Prompt({creator:userId,prompt,tag});
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201});
    }catch(error){
        console.log("error:: error>"+error);
        return new Response('failed create new Prompt 📛',{status:500});
    }
}

