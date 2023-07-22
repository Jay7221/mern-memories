import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;

            let decodedData;

            if(token && isCustomAuth){
                decodedData = jwt.verify(token, 'secret_string');
                req.userId = decodedData?.id;
            }
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.json({ message: "Something went wrong "});
    }
};
export default auth;