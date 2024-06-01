import useUser from "../context/useUser";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const user = useUser((state) => state.user);
  const query = useQuery({
    queryKey: ["productos"],
    queryFn: async () => {
      const url = `http://localhost:3000/productos`;
      const request = await fetch(url);
      return await request.json();
    },
  });
  const { isError, isLoading, data } = query;

  return (
    <>
      <main>
        <h1>Bienvenido {!user ? "a mi Web" : `${user.username}`}</h1>
        {isError && <p>Eror de los Datos</p>}
        {isLoading && <p>Cargando los datos ...</p>}
        {!isError && !isLoading && data.length == 0 && <p>No hay productos</p>}
        {!isError && !isLoading && data.length > 0 && (
          <ul>
            {data.map((p) => (
              <li key={p._id}>{p.name}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};
export default Home;
