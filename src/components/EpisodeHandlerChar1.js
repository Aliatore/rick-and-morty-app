import React from "react";

const EpisodeHandlerChar1 = ({ dataChar1, dataEp1 }) => {
  return (
    <div className="container">
      <div className="row">
        <div  className="col-12">
          <div className="styles-card-2" style={{ minWidth: "200px" }}>
            <div className="row p-3 card-body">
                <h5 className="card-title">{dataChar1.name}</h5>
                <hr />
                {dataEp1.map((item, index) => (
                    <div key={index}>
                        <b  className="card-text">
                            {item.episode}
                        </b>&nbsp;-&nbsp;
                        <span  className="card-text">
                            {item.name}
                        </span>&nbsp;-&nbsp;
                        <span  className="card-text">
                            {item.air_date}
                        </span>
                    </div>
                    
                ))}
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default EpisodeHandlerChar1;
