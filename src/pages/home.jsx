import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./home.css";
import axios from "axios";
import Banner from "../components/banner";

export default function Home() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [procura, setProcuta] = useState("");
  const [render, setRender] = useState({});
  const [bannerOn, setBannerON] = useState(false);
  const nome = useParams.nome;

  useEffect(() => {
    apiRickAndMorty();
  }, [nome]);

  async function renderizar(id) {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const personagem = response.data;
      setRender(personagem);
      console.log(personagem);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }
  function apiRickAndMorty() {
    axios
      .get(`https://rickandmortyapi.com/api/character`)
      .then((response) => {
        const clubesData = response.data;
        setData(clubesData.results);
        setShow(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }
  function procurarPersonagem(nome) {
    setShow(false);
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${nome}`)
      .then((response) => {
        const procura = response.data;
        setData(procura.results);
        setShow(true);
        console.log(procura);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }
  return (
    <div className="container">
      <div>
        <div className="search-container">
          <input
          placeholder="Procurar personagem"
            onChange={(event) => {
              setProcuta(event.target.value);
            }}
          />
          <button
            onClick={() => {
              procurarPersonagem(procura);
            }}
          >
            GO
          </button>
        </div>

        {show && (
          <ul>
            {data.map((personagem) => (
              <div
                onClick={() => {
                  renderizar(personagem.id);
                  setBannerON(true);
                }}
              >
                <div className="div1" key={personagem.id}>
                  <div className="lista">
                    <img src={personagem.image} />
                    <div className="nomes">
                      <p className="p1">{personagem.name}</p>
                      <p className="p2">{personagem.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div>
        {bannerOn && render.name ? (
          <div>
            <Banner personagem={render} />
          </div>
        ) : (
          <div>
            <h1>carregando</h1>
          </div>
        )}
      </div>
    </div>
  );
}
