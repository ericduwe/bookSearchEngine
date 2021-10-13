import { gql } from '@apollo/react-hooks';

export const GET_ME = gql`
query me {
    me {
    _id
    username
    email
    savedBooks
    }
}
`