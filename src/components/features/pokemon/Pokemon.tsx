import { useParams } from "react-router-dom";

const Pokemon = () => {
    const {id}= useParams();
  return (
    <>
        <div>This is Pokemon Page !!!</div>
        <p>Search is for pokemon : {id}</p>
    </>
  )
}

export default Pokemon