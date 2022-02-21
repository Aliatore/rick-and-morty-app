import React from "react";

const CharacterList = ({ characters, sendChar2}) => {

  const traducir = (txt) => {
    if (txt !== null && txt !== undefined && txt !== "") {
      switch (txt) {
        case "Dead":
          return "Muerto"
        case "Alive":
          return "Vivo"
        default:
          return "Desconocido"
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        {characters.map((item, index) => (
          <div key={index} onClick={()=>sendChar2(item)} className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="styles-card" style={{ minWidth: "200px" }}>
              <div className="row p-3 card-body">
                <div className="col-6 ">
                  <img className="card-img-top" src={item.image} alt="character" />
                </div>
                <div className="col-6">
                <h5 className="card-title">{item.name}</h5>
                  <hr />
                  <p className="card-text">Especies: {item.species}</p>
                  <p className="card-text">Estatus: {traducir(item.status)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
