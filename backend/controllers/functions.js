const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes"); // Importing http-status-codes
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const { Meeting } = require("../model/meeting");


const myzoomsecret = "myzoomkey"; // Secret key for JWT authentication

const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide email and password" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (isPasswordCorrect) {
        const data = { username: user.username, email: user.email, date: new Date() };
  
        const token = jwt.sign(data, myzoomsecret);
  
        user.token = token;
        await user.save();
            
res.cookie("token1", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month in milliseconds
    httpOnly: true, // Optional for security// can not be accessed by the client side on the react side
    path: "/", // Accessible across the site
     secure: true,          // required if using SameSite=None
  sameSite: "none"      // allows cross-site cookie sending
  });
console.log("Token is set");

  return res.status(StatusCodes.OK).json({ token1: token });

} else {
  return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid username or password" });
}
} catch (e) {
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e}` });
}
};


const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({ message: "Username already exists" });
      }
  
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        return res.status(StatusCodes.CONFLICT).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return res.status(StatusCodes.CREATED).json({ message: "User registered successfully" });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e}` });
    }
  };

  const isloggedin = async (req, res, next) => {
    const token = req.cookies.token1;
    if (!token || token === "") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
  
    try {
      const data = jwt.verify(token, myzoomsecret);
      const user = await User.findOne({ email: data.email });
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
      }
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
  
    next();
  };


const auth = async (req, res) => {
  const token = req.cookies.token1;
  if (!token || token === "") {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, myzoomsecret);
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(200).json({ token1: token, message: "Authorized" });
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(401).json({ message: "Unauthorized" });
};

const logout = async (req, res) => {   
    const token = req.cookies.token1; 
    if (!token || token === "") {
        console.log("No token found");
        return res.status(401).json({ message: "cannotlogout" });
      }
    
      try {
        const data = jwt.verify(token, myzoomsecret);
        const user = await User.findOne({ email: data.email });
        if (user) {
            res.clearCookie("token1"); 
            user.token = "";
            await user.save();
          return res.status(200).json({  message: "logoutsuccessfull" });
        }
      } catch (err) {
        console.log(err);
      }
    
      return res.status(401).json({ message: "cannotlogout" });

};

const addToHistory = async (req, res) => {
    const {meeting_code } = req.body;
     const token = req.cookies.token1;
  if (!token || token === "") {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

//start from here
    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(200).json({ message: "Added code to history" })
    } catch (e) {
        res.status(401).json({ message: `Something went wrong ${e}` })
    }
}

const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

module.exports = { login, register, isloggedin, auth,logout ,addToHistory,getUserHistory};
