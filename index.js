const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');

const schema = fs.readFileSync("./schema.graphql", "utf8");

const authors = [
    { ida: "1", name: "Douglas Adams", nationality: "British" },
    { ida: "2", name: "George Orwell", nationality: "British" },
    { ida: "3", name: "Harper Lee", nationality: "American" },
    { ida: "4", name: "J.D. Salinger", nationality: "American" },
    { ida: "5", name: "F. Scott Fitzgerald", nationality: "American" },
    { ida: "6", name: "Herman Melville", nationality: "American" },
    { ida: "7", name: "Jane Austen", nationality: "British" },
    { ida: "8", name: "J.R.R. Tolkien", nationality: "British" },
    { ida: "9", name: "J.K. Rowling", nationality: "British" },
    { ida: "10", name: "Fyodor Dostoevsky", nationality: "Russian" }
]

const books = [
    { idb: "012", title: "El restaurante del fin del mundo", author:"Douglas Adams", ISBN:"321654654", releaseDate:"10/09/1980"},
    { idb: "052", title: "Ven y pon una centinela", author:"Harper Lee", ISBN:"321547856", releaseDate:"14/07/2015"},
    { idb: "153", title: "Rebelion en la granja", author:"George Orwell", ISBN:"156987456", releaseDate:"17/08/1945"},
    { idb: "201", title: "El guardián entre el centeno", author:"J.D. Salinger", ISBN:"102345689", releaseDate:"16/07/1951"}
]

const loans = [
    { idl: "00513", book: "Ven y pon una centinela", user:"Brandon Z", loanDate:"15/03/2024", returnDate:"22/03/2024"},
    { idl: "12347", book: "El guardián entre el centeno", user:"Chuagi", loanDate:"20/03/2024", returnDate:"03/04/2024"},
    { idl: "02315", book: "El restaurante del fin del mundo", user:"Chuagi", loanDate:"12/03/2024", returnDate:"30/03/2024"}
]


const resolvers = {
    Query: {
        allAuthors: () => authors,
        allBooks: () => books,
        allLoans: () => loans,
        idBook: (parent, { idb }) => books.find(book => book.idb === idb)
    }
}


const server = new ApolloServer({
    typeDefs: gql(schema),
    resolvers
});

server.listen().then(({url}) =>{
    console.log(`Servidor corriendo en ${url}`);
})