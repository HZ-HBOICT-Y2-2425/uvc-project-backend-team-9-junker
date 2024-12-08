import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function getAllCommunites(req, res) {
    try {
        // Fetch all communities from the 'communities' table
        const allCommunities = await db('communities').select('*'); 
        // If no communities are found, send a 404 response
        if (!allCommunities || allCommunities.length === 0) {
            return res.status(404).json({ message: "No communities found" });
        }

        // Send all communities in the response
        res.status(200).json(allCommunities);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching all communities:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getCommunity(req, res) {
    try {
        const { id } = req.params; // Get the community ID from the request parameters

        // Fetch the community from the database
        const community = await db('communities').where({ id }).first();

        // If the community is not found, send a 404 response
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        // Send the community in the response
        res.status(200).json(community);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching community:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function joinCommunity(req, res) {
    try {
        const { userid, community_id } = req.params; // `userid` and `id` from the route

        // Insert the user-community relationship into the database
        const member = await db('members').insert({
            user_id: userid,
            community_id: community_id,
        });

        // Return success response
        res.status(200).json({
            message: "Successfully joined community.",
            member,
        });
    } catch (error) {
        console.error("Error joining community:", error);
        res.status(500).json({ error: "Failed to join community." });
    }
}

export async function createCommunity(req, res) {
    try {
        const { userid } = req.params; // Assuming `userid` is passed in the route

        // Send the `userid` back to the client for inclusion in the form
        res.status(200).json({
            message: "Ready to create an community",
            userid,
        });
    } catch (error) {
        console.error("Error preparing community creation:", error);
        res.status(500).json({ error: "Failed to prepare community creation." });
    }
}

export async function storeCommunity(req, res) {
    try {
        const { userid, name, description, location, status, cover_pic } = req.body; // Request body contains all attributes
        // console.log(req.body);
        
        // Insert the community into the database    
        const [id] = await db('communities').insert({
            userid,        // Foreign key from the route
            name,          // community name
            description,   // community description
            location,
            status,        // community status: private / public
            cover_pic,     // community cover picture
        });

        // Return success response
        res.status(201).json({
            message: "community successfully created.",
            communityId: id,
        });
    } catch (error) {
        console.error("Error storing community:", error);
        res.status(500).json({ error: "Failed to store community." });
    }
}

export async function updateCommunity(req, res) {
    try {
        const { userid, id } = req.params; // `userid` and `id` from the route
        const { name, description, status, cover_pic } = req.body; // Request body contains all attributes

        // Update the community in the database
        const updatedRows = await db('communities')
            .where({ id, userid }) 
            .update({
                name,
                description,
                status,
                cover_pic
            });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "community not found or not owned by this user." });
        }

        res.status(200).json({ message: "community successfully updated." });
    } catch (error) {
        console.error("Error updating community:", error);
        res.status(500).json({ error: "Failed to update community." });
    }
}

export async function deleteCommunity(req, res) {
    try {
        const { userid, id } = req.params; // `userid` and `id` from the route

        // Delete the community from the database
        const deletedRows = await db('communities')
            .where({ id, userid }) 
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "community not found or not owned by this user." });
        }

        res.status(200).json({ message: "community successfully deleted." });
    } catch (error) {
        console.error("Error deleting community:", error);
        res.status(500).json({ error: "Failed to delete community." });
    }
}
