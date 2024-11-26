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

// Allow user to edit info
export async function editUser(req, res) {
    const { username } = req.params;
    const { fullName, password, profile_pic } = req.body;
    
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

        const hashedPassword = await hash(password, 10);

        await db('users').where({ username }).update({
            fullname: fullName,
            password: hashedPassword,
            profile_pic: profile_pic,
        });

        res.status(201).json("User edited successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json("Internal server error");
    }
};

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
export async function loginUser(req, res) {
    const { username, password } = req.body;

    //check to see if the user exists in the list of registered users
    const user = await db('users').where({ username }).first();
    if (!user) {
        res.status(404).send("User does not exist!");
    }
    else {
        if (await compare(password, user.password)) {
            const accessToken = generateAccessToken({ user: req.body.name });
            const refreshToken = generateRefreshToken({ user: req.body.name });
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        }
        else {
            res.status(401).send("Password Incorrect!");
        }
    }
}

export async function getPublicUser(req, res) {
    const { username } = req.params;
    const user = await db('users').where({ username }).first();

    if (user) {
        const publicProfile = {
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


//REFRESH TOKEN API
export async function refreshToken(req, res) {
    if (refreshTokens.includes(req.body.token)) {
        //remove the old refreshToken from the refreshTokens list
        refreshTokens = refreshTokens.filter((rtl) => rtl != req.body.token);

        //generate new accessToken and refreshTokens
        const accessToken = generateAccessToken({ user: req.body.name });
        const refreshToken = generateRefreshToken({ user: req.body.name });
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
        res.status(400).send("Refresh Token Invalid");
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

// delete user
export async function deleteUser(req, res) {
    const { username } = req.body;

    // Check if name and password are provided
    if (!username) {
        return res.status(400).send("Username is required");
    }

    try {
        // Check if the username already exists in the database
        const existingUser = await db('users').where({ username }).first();
        if (!existingUser) {
            return res.status(404).json("User does not exist");
        }

        await db('users').where({ username }).del();
        res.status(201).json("User deleted successfully");
    } catch {
        console.error("Error deleting user:", error);
        res.status(500).json("Internal server error");
    }
}

// accessTokens
function generateAccessToken(user) { 
    return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

// refreshTokens
function generateRefreshToken(user) {
    const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10m" });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

