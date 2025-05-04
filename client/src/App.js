import logo from "./logo.svg";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 😢</p>;

  return (
    <ul>
      {data.getTodos.map((todo) => (
        <li key={todo.id}>
          {todo.title} - {todo.completed ? "✅" : "❌"} (User: {todo.user?.name}
          )
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Todos</h1>
      <Todos />
    </ApolloProvider>
  );
}

export default App;
