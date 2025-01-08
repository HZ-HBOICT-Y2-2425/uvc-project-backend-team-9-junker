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
    console.log("getCommunity")
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

export async function getCommunitiesByUserId(req, res) {
    console.log("getCommunitiesByUserId");
    try {
        const { user_id } = req.params; // Get the user ID from the request parameters

        // Fetch all communities from the 'communities' table
        const communityIds = await db('members').select('community_id').where('user_id', user_id);
        const communityIdArray = communityIds.map(obj => obj.community_id);
        // If no pictures are found, send a 404 response
        if (!communityIdArray || communityIdArray.length === 0) {
            return res.status(404).json({ message: "No communities found" });
        }
        else {
            try {
                // Fetch all communities from the 'communities' table
                const allCommunitiesOfUser = await db('communities').select('*').whereIn('id', communityIdArray);; 
                // If no communities are found, send a 404 response
                if (!allCommunitiesOfUser || allCommunitiesOfUser.length === 0) {
                    return res.status(404).json({ message: "No communities found" });
                }
        
                // Send all communities in the response
                res.status(200).json(allCommunitiesOfUser);
            } catch (error) {
                // Handle any errors and send a 500 response
                console.error("Error fetching user communities:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }

    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching community IDs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMemberRole(req, res) {
    try {
        const { community_id } = req.params; // Get the community ID from the request parameters
        const { user_id} = req.body;
        // console.log(user_id, community_id);

        // find the community members from the database
        const member = await db('members')
            .select('role')
            .where({ user_id, community_id })
            .first(); // Retrieve only one matching record

        if (member) {
            res.status(200).json({ role: member.role });
        } else {
            res.status(404).json({ error: 'User not found in the community' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function joinCommunity(req, res) {
    try {
        const { community_id } = req.params; // Get the community ID from the request parameters
        const { user_id} = req.body;
        // console.log(user_id, community_id);

        // Insert the user-community relationship into the database
        const member = await db('members').insert({
            user_id: user_id,
            community_id: community_id,
            role: "member",
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

export async function leaveCommunity(req, res) {
    try {
        const { community_id } = req.params; // Get the community ID from the request parameters
        const { user_id} = req.body;
        // console.log(user_id, community_id);

        // Delete the user-community relationship from the database
        const deletedRows = await db('members')
            .where({ user_id, community_id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "User not found in the community." });
        }

        res.status(200).json({ message: "Successfully left the community." });
    } catch (error) {
        console.error("Error leaving community:", error);   
        res.status(500).json({ error: "Failed to leave community." });
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
