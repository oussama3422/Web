import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {connectToMongoDb} from '@utils/database';
import User from  '@models/user';


console.log({
    clientId:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    });

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({
                email:session.user.email
            }) 
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}){
         try{
            await connectToMongoDb();
            //check if the user is already exits
            const emailExists=await User.findOne({
                email:profile.email
            })
            if(!emailExists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture,
                })
            }
            return true;
         }catch(error){
            console.log("Error::::::>"+error);
            return false; 
        }
        }
    }
})


export {handler as GET, handler as POST}