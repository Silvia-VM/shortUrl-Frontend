import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    newUrl: "",
    loading: true,
    tabLists: []
  };

  async componentDidMount() {
    try {
      this.setState({
        loading: false
      });
      this.update();
    } catch (error) {
      console.log(error);
    }
  }
  update = async () => {
    const response = await axios.get("http://localhost:8080");
    console.log(response.data);
    this.setState({
      tabLists: response.data
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return <p>loading ...</p>;
    } else {
      return (
        <div>
          <section className="title">
            <h1>Simplify your links</h1>
            <div className="input-button">
              <form>
                <input
                  className="form-control"
                  placeholder="Your original URL here"
                  type="url"
                  pattern="(https|http)?://.+"
                  title="Invalid format of URL"
                  value={this.state.newUrl}
                  onChange={e => this.setState({ newUrl: e.target.value })}
                />
              </form>
              <button
                className="button-control"
                onClick={async () => {
                  await axios.post("http://localhost:8080/create", {
                    url: this.state.newUrl
                  });
                  this.setState({ newUrl: "" });
                  this.update();
                }}
              >
                SHORTEN URL
              </button>
            </div>
          </section>
          <div className="container">
            <div className="greyBox">
              <ul className="modelUrl">
                <li className="boxUrl">
                  <p>Original URL</p>
                </li>
                <li className="boxShort">
                  <p>Short URL</p>
                </li>
                <li className="boxVisits">
                  <p>visits</p>
                </li>
              </ul>
            </div>
            <div>
              {this.state.tabLists.map((element, index) => {
                return (
                  <div>
                    <ul className="modelUrl">
                      <li className="boxUrl">
                        <a href={element.url}>{element.url}</a>
                      </li>
                      <li className="boxShort">
                        <a href={element.short_url}>{element.short_url}</a>
                      </li>
                      <li className="boxVisits">
                        <p>{element.visits}</p>
                      </li>
                    </ul>
                    <p className="line" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
