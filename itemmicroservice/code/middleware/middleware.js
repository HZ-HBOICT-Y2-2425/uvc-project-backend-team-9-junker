
/*
import pkg from "jsonwebtoken";
const { verify } = pkg;

export async function validateToken(req, res, next) {
    console.log("Start validate token");
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(400).send("Authorization header not present");
    }

    // Split the header to extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).send("Token not present in Authorization header");
    }

    // Verify the token
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.log("Token expired");
                return res.status(401).send("Token expired"); // Trigger refresh on frontend
            }
            console.log("Token invalid");
            return res.status(403).send("Token invalid");
        }
        console.log("Token is valid");
        req.user = decodedUser;
        next(); // Proceed to the next middleware or route handler
    });
}
*/