import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

let refreshTokens = [];

export async function getUser(req, res) {
    return res.status(200).send("hi");
}

// REGISTER A USER 
export async function addUser(req, res) { 
    const { fullName, username, password } = req.body;

    // Check if name and password are provided
    if (!fullName || !username || !password) {
        return res.status(400).send("Full name, username and password are required");
    }

    try {
        // Check if the username already exists in the database
        const existingUser = await db('users').where({ username }).first();
        if (existingUser) {
            return res.status(409).json("User already exists");
        }

        const hashedPassword = await hash(password, 10);
        const profilePicUrl = `https://ui-avatars.com/api/?name=${fullName.replace(/\s+/g, '+')}`;

        await db('users').insert({
            fullname: fullName,
            username: username,
            password: hashedPassword,
            profile_pic: profilePicUrl,
        });
        res.status(201).json("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json("Internal server error");
    }
}

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
export async function loginUser(req, res) {
    const { username, password } = req.body;

    //check to see if the user exists in the list of registered users
    const user = await db('users').where({ username }).first();
    if (!user) {
        res.status(404).send("User does not exist!");
    } else {
        if (await compare(password, user.password)) {
            const accessToken = generateAccessToken({ username: user.username });
            const refreshToken = generateRefreshToken({ username: user.username });
            console.log("Login successfully");

            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.status(400).send("Password Incorrect!");
        }
    }
}

// Allow user to edit info
export async function editUser(req, res) {
    const { username, currentPassword, newPassword, profile_pic } = req.body;

    // Ensure the username in the URL matches the authenticated user
    if (req.user.username !== username) {
        return res.status(403).json({ error: "You can only edit your own profile." });
    }

    try {
        // Check if the username already exists in the database
        const existingUser = await db('users').where({ username }).first();
        if (!existingUser) {
            return res.status(404).json("User doesn't exist");
        }

        // Update profile picture if provided
        if (profile_pic) {
            await db('users').where({ username }).update({ profile_pic });
            console.log("Profile picture updated successfully");
        }        

        // Update password if both currentPassword and newPassword are provided
        if (currentPassword && newPassword) {
            const isPasswordCorrect = await compare(currentPassword, existingUser.password);
            if (!isPasswordCorrect) {
                return res.status(401).json("Current password is incorrect");
            }

            const hashedPassword = await hash(newPassword, 10);
            await db('users').where({ username }).update({ password: hashedPassword });
            console.log("Password updated successfully");
        }

        res.status(200).json("User edited successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json("Internal server error");
    }
};

export async function likeItem(req, res) {
    const { userid, itemid } = req.body;
    let likedItems = "";
    try {
        let response = await db('users').select('liked_items').where({ id: userid}).first();
        likedItems = response.liked_items;
    } catch (error) {
        console.error("Error fetching user.liked_items:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

    likedItems = await JSON.parse(likedItems);
    likedItems.push(itemid);
    likedItems = await JSON.stringify(likedItems);

    try {
        await db('users').where({ id: userid}).update({ liked_items: likedItems });
        console.log("Liked Items updated successfully");
    } catch (error) {
        console.error("Error updating user.liked_items:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json("Likes updated successfully");
}

export async function dislikeItem(req, res) {
    const { userid, itemid } = req.body;
    let dislikedItems = "";
    try {
        let response = await db('users').select('disliked_items').where({ id: userid}).first();
        dislikedItems = response.disliked_items;
    } catch (error) {
        console.error("Error fetching user.disliked_items:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }


    dislikedItems = await JSON.parse(dislikedItems);
    dislikedItems.push(itemid);
    dislikedItems = JSON.stringify(dislikedItems);

    try {
        await db('users').where({ id: userid}).update({ disliked_items: dislikedItems });
        console.log("Disliked Items updated successfully");
    } catch (error) {
        console.error("Error updating user.disliked_items:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json("Dislikes updated successfully");
}

export async function deleteLikes(req, res) {
    const {userid} = req.params;
    try {
        await db('users').where({ id: userid}).update({ disliked_items: '[]' });
        console.log("Dislikes deleted successfully");
    } catch (error) {
        console.error("Error deleteding Dislikes:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

    try {
        await db('users').where({ id: userid}).update({ liked_items: '[]' });
        console.log("Likes deleted successfully");
    } catch (error) {
        console.error("Error deleteding Likes:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json("Likes and Dislikes deleted successfully");
}

export async function addDealedItem(req, res) {
    const { userid, itemid } = req.body;

    try {
        // Fetch the user's dealed items from the database
        let response = await db('users').select('dealed_items').where({ id: userid }).first();
        let dealedItems = response.dealed_items ? JSON.parse(response.dealed_items) : [];

        // Check if the itemid already exists in the array
        if (!dealedItems.includes(itemid)) {
            dealedItems.push(itemid);

            // Update the dealed_items array in the database
            await db('users').where({ id: userid }).update({ dealed_items: JSON.stringify(dealedItems) });

            console.log("Dealed Items updated successfully");
            res.status(200).json(itemid);
        } else {
            console.log("Item already exists in Dealed Items");
        }

    } catch (error) {
        console.error("Error updating user.dealed_items:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}



export const getPublicUser = async (req, res) => {
    const { userid } = req.params;
    try {
        console.log("Fetching user with ID:", userid); // Log the ID
        const user = await db('users').where({ id: userid }).first();
        console.log("User data fetched:", user); // Log the result

        if (!user) {
            console.error("User not found for ID:", userid);
            return res.status(404).json({ error: 'User does not exist!' });
        }

        res.json({
            publicProfile: {
                fullname: user.fullname,
                profile_pic: user.profile_pic,
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export async function getPublicUserById(req, res) {
    const { id } = req.params;
    const user = await db('users').where({ id }).first();
    console.log(user)
    if (user) {
        const publicProfile = {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            profile_pic: user.profile_pic,
        };
        res.status(200).json({ publicProfile }); // Send JSON response
    } else {
        res.status(404).json({ error: "User does not exist!" });
    }
}

export async function getPrivateUser(req, res) {
    const { username } = req.params;
    const user = await db('users').where({ username }).first();

    if (user) {
        res.status(200).json({ user }); // Send JSON response
    } else {
        res.status(404).json({ error: "User does not exist!" });
    }
}

//LOGOUT API
export async function logoutUser(req, res) {
    //remove the old refreshToken from the refreshTokens list  
    console.log(refreshTokens);
    refreshTokens = refreshTokens.filter((rtl) => rtl != req.body.token);
    console.log(refreshTokens);
    // response successfully logged out without any response body
    res.status(204).send("Logged out!");             
}

export async function deleteUser(req, res) {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send("Username is required");
    }

    try {
        const existingUser = await db('users').where({ username }).first();
        if (!existingUser) {
            return res.status(404).json("User does not exist");
        }

        await db('users').where({ username }).del();
        res.status(200).json("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json("Internal server error");
    }
}



//REFRESH TOKEN API
export async function refreshToken(req, res) {
    const { refreshToken, username } = req.body;
    console.log('Refresh token start: ');
    console.log("received token: " + refreshToken);
    console.log("array: " + refreshTokens);

    if (!refreshToken) {
        console.log('Refresh token not found');
        return res.status(401).send("Refresh token required");
    }

    if (!refreshTokens.includes(refreshToken)) {
        console.log('Refresh token invalid');
        return res.status(403).send("Refresh token invalid");
    }

    try {
        // Generate new tokens
        const accessToken = generateAccessToken({ username: username });
        const newRefreshToken = generateRefreshToken({ username: username });

        // Replace the old refresh token
        refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
        if (!refreshTokens.includes(newRefreshToken)) {
            refreshTokens.push(newRefreshToken);
        }
        
        console.log("Token is refreshed successfully");
        console.log("array: " + refreshTokens);
        console.log("access: " + accessToken);
        console.log("refresh: " + newRefreshToken);

        res.json({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (err) {
        console.log("Error verifying refresh token:", err);
        res.status(403).send("Invalid token");
    }
}

// accessTokens
function generateAccessToken(user) {
    const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    return accessToken;
}

// refreshTokens
function generateRefreshToken(user) {
    const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

