import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
    type User {
        id: String,
        fullName: String,
        email: String,
        token: String,
        code: Int,
        message: String
    }

    input RegiterInput {
        fullName: String,
        email: String,
        password: String
    }

    input LoginInput {
        email: String,
        password: String
    }

    type Query {
        getUser(id: String): User
    }

    type Mutation {
        register(user: RegiterInput): User,
        login(user: LoginInput): User
    }
`;