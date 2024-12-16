import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function getAllPictures(req, res) {
    try {
        // Fetch all communities from the 'Pictures' table
        const allPictures = await db('pictures').select('*'); 
        // If no communities are found, send a 404 response
        if (!allPictures || allPictures.length === 0) {
            return res.status(404).json({ message: "No pictures found" });
        }

        // Send all communities in the response
        res.status(200).json(allPictures);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching all pictures:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPicture(req, res) {
    try {
        const { id } = req.params; // Get the picture ID from the request parameters

        // Fetch the picture from the database
        const picture = await db('pictures').where({ id }).first();

        // If the picture is not found, send a 404 response
        if (!picture) {
            return res.status(404).json({ message: "Picture not found" });
        }

        // Send the community in the response
        res.status(200).json(picture);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching picture:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPictureByName(req, res) {
    try {
        const { name } = req.params; // Get the picture ID from the request parameters

        // Fetch the picture from the database
        const picture = await db('pictures').where('name', name).first();

        // If the picture is not found, send a 404 response
        if (!picture) {
            return res.status(404).json({ message: "Picture not found" });
        }

        // Send the community in the response
        res.status(200).json(picture);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching picture:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPicturesByUserId(req, res) {
    try {
        const { userid } = req.params; // Get the picture ID from the request parameters

        // Fetch all pictures from the 'pictures' table
        const allPictures = await db('pictures').select('*').where('userid', userid);; 
        // If no pictures are found, send a 404 response
        if (!allPictures || allPictures.length === 0) {
            return res.status(404).json({ message: "No picture(s) found" });
        }

        // Send all communities in the response
        res.status(200).json(allPictures);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching pictures:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPicturesByItemId(req, res) {
    try {
        const { itemid } = req.params; // Get the picture ID from the request parameters

        // Fetch all pictures from the 'pictures' table
        const allPictures = await db('pictures').select('*').where('itemid', itemid);; 
        // If no pictures are found, send a 404 response
        if (!allPictures || allPictures.length === 0) {
            return res.status(404).json({ message: "No picture(s) found" });
        }

        // Send all communities in the response
        res.status(200).json(allPictures);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching pictures:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPicturesByCommunityId(req, res) {
    try {
        const { communityid } = req.params; // Get the picture ID from the request parameters

        // Fetch all pictures from the 'pictures' table
        const allPictures = await db('pictures').select('*').where('communityid', communityid);; 
        // If no pictures are found, send a 404 response
        if (!allPictures || allPictures.length === 0) {
            return res.status(404).json({ message: "No picture(s) found" });
        }

        // Send all communities in the response
        res.status(200).json(allPictures);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching pictures:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function storePicture(req, res) {
    try {
        const { 
            userid, itemid, communityid, name, data
        } = req.body; // Request body contains all attributes
        
        // Insert the community into the database    
        const [id] = await db('pictures').insert({
            userid, itemid, communityid, name, data
        });

        // Return success response
        res.status(201).json({
            message: "picture successfully created.",
            pictureId: id,
        });
    } catch (error) {
        console.error("Error storing picture:", error);
        res.status(500).json({ error: "Failed to store picture." });
    }
}

/*

export async function storePicture(req, res) {
    console.log("storePicture()");
    const userid = req.params.id; // `userid` is assumed to be part of the route
    console.log(req.body);
    const { name } = req.body; // Request body contains all attributes
    const description = "new picture";
    const action = true;
    const available = true;

    // Check if data is provided
    if (!name || !description || !action || !available) {
        return res.status(400).send("Name, description, action, available are required");
    }

    try {
        
        // Insert the picture into the database    
        await db('pictures').insert({
            userid: userid,        // Foreign key from the route
            name: name,          // Picture name
            description: description,   // Picture description
            action: action,        // Boolean for action
            available: available,     // Boolean for availability
        });

        //console.log(picture);

        // Return success response
        res.status(201).json({
            message: "Picture successfully created.",
            //pictureId: id,
        });
    } catch (error) {
        console.error("Error storing picture:", error);
        res.status(500).json({ error: "Failed to store picture." });
    }
}
*/

export async function updatePicture(req, res) {
    try {
        const { id } = req.params; // `userid` and `id` from the route
        const { userid, itemid, communityid, name, data  } = req.body; // Updated fields

        // Update the Picture in the database
        const updatedRows = await db('pictures')
            .where({ id }) 
            .update({
                userid, itemid, communityid, name, data
            });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Picture not found or not owned by this user." });
        }

        res.status(200).json({ message: "Picture successfully updated." });
    } catch (error) {
        console.error("Error updating picture:", error);
        res.status(500).json({ error: "Failed to update picture." });
    }
}

export async function deletePicture(req, res) {
    try {
        const { id } = req.params; // `userid` and `id` from the route

        // Delete the picture from the database
        const deletedRows = await db('pictures')
            .where({ id }) 
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Picture not found or not owned by this user." });
        }

        res.status(200).json({ message: "Picture successfully deleted." });
    } catch (error) {
        console.error("Error deleting picture:", error);
        res.status(500).json({ error: "Failed to delete picture." });
    }
}
