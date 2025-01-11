import development from '../knexfile.js';
import knex from 'knex';

const db = knex(development);

export async function getAllItems(req, res) {
    try {
        // Fetch all communities from the 'items' table
        const allItems = await db('items').select('*'); 
        // If no communities are found, send a 404 response
        if (!allItems || allItems.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        // Send all communities in the response
        res.status(200).json(allItems);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching all items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getItem(req, res) {
    try {
        const { id } = req.params; // Get the item ID from the request parameters

        // Fetch the item from the database
        const item = await db('items').where({ id }).first();

        // If the item is not found, send a 404 response
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        // Send the community in the response
        res.status(200).json(item);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getItemsByUser(req, res) {
  try {
      const { userid } = req.params;

      // Validate that userid is provided
      if (!userid) {
          return res.status(400).json({ 
              meta: { status: 400, message: "UserID is required." },
              data: null 
          });
      }

      // Query database for items by the user
      const items = await db('items').where({ userid }).select('*');

      // If no items are found, return 404
      if (items.length === 0) {
          return res.status(404).json({ 
              meta: { status: 404, message: `No items found for user with ID ${userid}.` },
              data: [] 
          });
      }

      // Success response with items
      res.status(200).json({
          meta: { 
              status: 200, 
              message: `Items retrieved successfully for user ID ${userid}.`,
              timestamp: new Date().toISOString() 
          },
          data: items
      });
  } catch (error) {
      console.error("Error retrieving items by user:", error);
      res.status(500).json({
          meta: { status: 500, message: "Internal server error." },
          data: null
      });
  }
}

export async function storeItem(req, res) {
    try {
        const { 
            userid, name, description, pictures, action, available, views,
            interested, categories, communities 
        } = req.body; // Request body contains all attributes

        console.log(pictures);
        
        // Insert the community into the database    
        const [id] = await db('items').insert({
            userid, name, description, pictures, action, available, views,
            interested, categories, communities
        });

        // Return success response
        res.status(201).json({
            message: "item successfully created.",
            itemId: id,
        });
    } catch (error) {
        console.error("Error storing item:", error);
        res.status(500).json({ error: "Failed to store item." });
    }
}

export async function updateItem(req, res) {
    try {
        const { id, userid } = req.params; // `userid` and `id` from the route
        const { name, description, pictures, action, available, views,
            interested, categories, communities  } = req.body; // Updated fields

        // Update the item in the database
        const updatedRows = await db('items')
            .where({ id, userid }) 
            .update({
                name, description, pictures, action, available, views,
                interested, categories, communities
            });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Item not found or not owned by this user." });
        }

        res.status(200).json({ message: "Item successfully updated." });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Failed to update item." });
    }
}

export async function deleteItem(req, res) {
    try {
        const { id, userid } = req.params; // `userid` and `id` from the route

        // Delete the item from the database
        const deletedRows = await db('items')
            .where({ id, userid }) 
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Item not found or not owned by this user." });
        }

        res.status(200).json({ message: "Item successfully deleted." });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Failed to delete item." });
    }
}
