const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; //เก็บ secret key สำหรับ JWT signing ไว้ใน environment variable

exports.verifyToken = (req, res, next) => { // ใช้ middleware ในการตรวจสอบ token

  const authHeader = req.headers.authorization; 
  // ตรวจสอบว่า request มี header Authorization หรือไม่
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try { // ตรวจสอบ token ว่าถูกต้องหรือไม่
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
