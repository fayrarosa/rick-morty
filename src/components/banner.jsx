
import './banner.css'
export default function Banner({ personagem }) {
  return (
    <div className="banner">
        <div className='container'>
<button onClick={()=>{
  console.log(personagem)
}} >console.log</button>
      <img src={personagem.image} />
      <h3>Nome: {personagem.name}</h3>
      <h3>Status: {personagem.status}</h3>
      <h3>Espécie: {personagem.species}</h3>
      <h3>Vindo de: {personagem.location.name}</h3>
        </div>
    </div>
  );
}
