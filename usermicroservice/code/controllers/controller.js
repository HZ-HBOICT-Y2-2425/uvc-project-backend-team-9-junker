import { hash, compare } from 'bcrypt';
// import sign from 'jsonwebtoken' does not work
import pkg from 'jsonwebtoken';
const { sign } = pkg;

let refreshTokens = [];
// in process list of users, will be destroyed on restart (should use database to persist)
const userList = [
{
    "username": "Geertje",
    "password": "$2b$10$FkR/POy8yBdatZzbVk6YBOyVlqem0wESFKBVU2Vx/WCGa0ctzmMsy",
    "email": "geertje@example.com",
},
{
    "username": "Jos",
    "password": "$2b$10$lWOejQYPBoWZnMhD6fccZu8SetefzgRkxal811Ftj.QbsAMysvp2e",
    "email": "jos@example.com",
}];

export async function getUserList(req, res) {
    return res.status(200).send(userList);
}

// REGISTER A USER 
export async function addUser(req, res) { 
    const { username, password } = req.body;

    // Check if name and password are provided
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    // Check if user already exists
    if (userList.find((ul) => ul.username == username)) {
        return res.status(409).send("User already exists");
    }

    try {
        const hashedPassword = await hash(password, 10);
        userList.push({ username, password: hashedPassword });
        res.status(201).send(userList);
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).send("Internal server error");
    }
}

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
export async function loginUser(req, res) {
    const { username, password } = req.body;

    //check to see if the user exists in the list of registered users
    const user = userList.find((ul) => ul.username == username);
    if (user == null) {
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

export async function getOneUser(req, res) {
    const user = userList.find((ul) => ul.username === req.params.username);
    if (user) {
        res.status(200).json({ username: user.username }); // Send JSON response
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

// accessTokens
function generateAccessToken(user) { 
    return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}

// refreshTokens
function generateRefreshToken(user) {
    const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10m" });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

