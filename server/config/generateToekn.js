import jwt from "jsonwebtoken";


const generateToekn =(id)=> {
    return jwt.sign({ id }, 'test', { expiresIn: "30d" });
};

export default generateToekn;