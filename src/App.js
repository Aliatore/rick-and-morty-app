import React, { Component } from "react";
import axios from "axios";
// componentes
import Navbar from "./components/Navbar";
import CharacterList1 from "./components/CharacterList1";
import CharacterList2 from "./components/CharacterList2";
import EpChar1 from "./components/EpisodeHandlerChar1";
import EpChar2 from "./components/EpisodeHandlerChar2";
import EpBoth from "./components/EpisodeHandlerBoth";
//styles general
import "./assets/css/styles.css"
import { Button } from 'reactstrap';
export default class App extends Component {
  constructor(props) {
    super(props);
     this.state = {
      url_api: "https://rickandmortyapi.com/api/character",
      charactersS1: null,
      charactersS2: null,
      infoS1: null,
      infoS2: null,
      dataCh1: null,
      dataCh2: null,
      dataEpisodesCh1: [],
      dataEpisodesCh2: [],
      f_1: false,
      f_2: false,
      passed1: false,
      passed2: false,
      showChr1: false,
      showChr2: false,
    };

  }

  fetchCharactersSection1 = (url) => {
    axios
      .get(url)
      .then((response) => {
        if (this.state.f_1 === false) {
          this.setState({
            charactersS1: response.data.results,
            infoS1: response.data.info,
            passed1: true,
            f_1: true
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleNextPageSection1 = () => {
    this.setState({f_1: false})
    this.fetchCharactersSection1(this.state.infoS1.next);
    // window.scrollTo(0, 0);
  };
  handlePreviousPageSection1 = () => {
    this.setState({f_1: false})
    this.fetchCharactersSection1(this.state.infoS1.prev);
    // window.scrollTo(0, 0);
  };
  fetchCharactersSection2 = (url) => {
    axios
      .get(url)
      .then((response) => {
        if (this.state.f_2 === false) {
          this.setState({
            charactersS2: response.data.results,
            infoS2: response.data.info,
            passed2: true
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleNextPageSection2 = () => {
    this.setState({f_2: false})
    this.fetchCharactersSection2(this.state.infoS2.next);
    // window.scrollTo(0, 0);
  };
  handlePreviousPageSection2 = () => {
    this.setState({f_2: false})
    this.fetchCharactersSection2(this.state.infoS2.prev);
    // window.scrollTo(0, 0);
  };
  setChar1Data = (data) => {
    
    this.setState({
      dataCh1: data,
      dataEpisodesCh1: [],
    })
    this.callDataFromepisodes(data, 1)
  }
  setChar2Data = (data) => {
    this.setState({
      dataCh2: data,
      dataEpisodesCh2: [],
    })
    this.callDataFromepisodes(data, 2)
  }
  callDataFromepisodes = (data, from) => {
    if (from === 1) {
      if (data !== undefined) {
        for (let i = 0; i < data.episode.length; i++) {
            axios
            .get(data.episode[i])
            .then((response) => {
              this.setState({ dataEpisodesCh1: [...this.state.dataEpisodesCh1, response.data], showChr1: true })
            })
            .catch((error) => {
                console.log(error);
            });
        }
      }   
    }else{
      if (data !== undefined) {
        for (let i = 0; i < data.episode.length; i++) {
            axios
            .get(data.episode[i])
            .then((response) => {
              this.setState({ dataEpisodesCh2: [...this.state.dataEpisodesCh2, response.data], showChr2: true })
            })
            .catch((error) => {
                console.log(error);
            });
        }
      } 
    }
  }
  cleanData = () => {
    this.setState({
      dataCh1: null,
      dataCh2: null,
      showChr1: false,
      showChr2: false,
      dataEpisodesCh1: [],
      dataEpisodesCh2: [],
    })
    window.scrollTo(0, 0);
  }

  componentDidMount() { 
    this.fetchCharactersSection1(this.state.url_api);
    this.fetchCharactersSection2(this.state.url_api);
  }
  render() {
    return (
      <div className="bg-general">
        <Navbar brand="Test Rick and Morty" />
        {
          this.state.passed1 === true && this.state.passed2 === true?
          (
            <>
            <div className="row">
              <div className="col-6">
                  <div className="container py-2">
                    <nav>
                      <ul className="pagination justify-content-center">
                        {this.state.infoS1.prev != null ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handlePreviousPageSection1()}>
                              Atras
                            </Button>
                          </li>
                        ) : null}
                        {this.state.infoS1.next ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handleNextPageSection1()}>
                              Siguiente
                            </Button>
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  </div>

                  <CharacterList1 sendChar1={this.setChar1Data} characters={this.state.charactersS1} />

                  <div className="container pb-5">
                    <nav>
                      <ul className="pagination justify-content-center">
                        {this.state.infoS1.prev ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handlePreviousPageSection1()}>
                              Atras
                            </Button>
                          </li>
                        ) : null}
                        {this.state.infoS1.next ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handleNextPageSection1()}>
                              Siguiente
                            </Button>
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  </div>
              </div>
              <div className="col-6">
                  <div className="container py-2">
                    <nav>
                      <ul className="pagination justify-content-center">
                        {this.state.infoS2.prev ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handlePreviousPageSection2()}>
                              Atras
                            </Button>
                          </li>
                        ) : null}
                        {this.state.infoS2.next ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handleNextPageSection2()}>
                              Siguiente
                            </Button>
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  </div>

                  <CharacterList2 sendChar2={this.setChar2Data} characters={this.state.charactersS2} />

                  <div className="container pb-5">
                    <nav>
                      <ul className="pagination justify-content-center">
                        {this.state.infoS2.prev ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handlePreviousPageSection2()}>
                              Atras
                            </Button>
                          </li>
                        ) : null}
                        {this.state.infoS2.next ? (
                          <li className="page-item m-2">
                            <Button onClick={() => this.handleNextPageSection2()}>
                              Siguiente
                            </Button>
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  </div>
              </div>
            </div>
            <div className="row justify-content-center centering py-2">
              <div className="col-2">
                <Button onClick={()=> this.cleanData()}>Borrar</Button>
              </div>
            </div>
            <div className="row">
              {this.state.showChr1 === true ? 
                (
                  <div className="col-4">
                      <EpChar1 dataEp1={this.state.dataEpisodesCh1} dataChar1={this.state.dataCh1} />
                  </div>
                )
                :
                <div className="col-4">
                      
                </div>
              }

              {this.state.showChr1 === true && this.state.showChr2 === true? 
                (
                  <div className="col-4">
                      <EpBoth dataEp1={this.state.dataEpisodesCh1} dataChar1={this.state.dataCh1} dataEp2={this.state.dataEpisodesCh2} dataChar2={this.state.dataCh2} />
                  </div>
                )
                :
                <div className="col-4">
                      
                </div>
              }
              {this.state.showChr2 === true ? 
                (
                  <div className="col-4">
                      <EpChar2 dataEp2={this.state.dataEpisodesCh2} dataChar2={this.state.dataCh2} />
                  </div>
                )
                :
                <div className="col-4">
                      
                </div>
              }
            </div> 
          </>
          )
          :
          (
            <div>
              cargando
            </div>
          )
        }
       

        
      </div>
    );
  }
};
