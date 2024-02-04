// get to ready 
import { connectToDb } from "@utils/Database";
import Prompt from "@models/prompt";


export const GET =async(req , {params}) =>{
    try {
        await connectToDb();
      
        const prompts = await Prompt.findById(params.id).populate('creator');

        if(!prompts){
            return new Response('Prompts not found ' , {status : 404});
        }

        return new Response(JSON.stringify(prompts) , {status : 200});


    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch the prompts' , {status : 500});
    }
}



//patch for update 
export const PATCH =async(req , {params}) =>{

    const {prompt , tag} = await req.json();

    try {
        await connectToDb();
      
        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt){
            return new Response('Prompts not found ' , {status : 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt) , {status : 200});


    } catch (error) {
        return new Response('Failed to update the prompts' , {status : 500});
    }
}

//delete for delete

export const DELETE = async (request, { params }) => {
    try {
        await connectToDb();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error deleting prompt", { status: 500 });
    }
};