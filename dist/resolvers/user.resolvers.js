"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_helper_1 = require("../helpers/generate.helper");
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = args;
            const user = yield user_model_1.default.findOne({
                token: token,
                deleted: false
            });
            if (user) {
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
        })
    },
    Mutation: {
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existEmail = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (existEmail) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            const token = (0, generate_helper_1.generateRandomString)(30);
            const dataUser = {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                token: (0, md5_1.default)(token)
            };
            const newUser = new user_model_1.default(dataUser);
            yield newUser.save();
            return {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                code: 200,
                message: "Đăng ký thành công!",
                token: token
            };
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const email = user.email;
            const password = user.password;
            const existUser = yield user_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!existUser) {
                return {
                    code: 400,
                    message: "Email không tồn tại!"
                };
            }
            if ((0, md5_1.default)(password) != (0, md5_1.default)(existUser.password)) {
                return {
                    code: 400,
                    message: "Sai mật khẩu!"
                };
            }
            return {
                id: existUser.id,
                fullName: existUser.fullName,
                email: existUser.email,
                code: 200,
                message: "Đăng nhập thành công!",
                token: user.token
            };
        })
    }
};
