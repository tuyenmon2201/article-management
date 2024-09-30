import User from "../models/user.model";
import { generateRandomString } from "../helpers/generate.helper";
import md5 from "md5";

export const resolversUser = {
    Query: {
        getUser: async (_, args) => {
            const { token }= args;

            const user = await User.findOne({
                token: token,
                deleted: false
            });

            if(user){
                return {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    token: user.token,
                    code: 200,
                    message: "Lấy thông tin thành công!"
                };
            }
            else {
                return {
                    code: 400,
                    message: "Token không tồn tại!"
                };
            }
        }
    },

    Mutation: {

        register: async (_, args) => {
            const { user } = args;

            const existEmail = await User.findOne({
                email: user.email,
                deleted: false
            });
    
            if(existEmail){
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                }
            }
    
            const token = generateRandomString(30);
            
            const dataUser = {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                token: md5(token)
            };
    
            const newUser = new User(dataUser);
            await newUser.save();

            return {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                code: 200,
                message: "Đăng ký thành công!",
                token: token
            };
        },

        login: async (_, args) => {
            const { user } = args;

            const email: string = user.email;
            const password: string = user.password;

            const existUser = await User.findOne({
                email: email,
                deleted: false
            });

            if(!existUser){
                return {
                    code: 400,
                    message: "Email không tồn tại!"
                };
            }

            if(md5(password) != md5(existUser.password)){
                return {
                    code: 400,
                    message: "Sai mật khẩu!"
                }
            }

            return {
                id: existUser.id,
                fullName: existUser.fullName,
                email: existUser.email,
                code: 200,
                message: "Đăng nhập thành công!",
                token: user.token
            }
        }
    }
};