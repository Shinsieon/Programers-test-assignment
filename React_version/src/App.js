import React from "react";
import { fetchLanguages } from "./api";

class App extends React.Component {
  state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };
  handleInputChange = async (e) => {
    const searchTxt = e.target.value;
    if (searchTxt.length === 0) return;

    const langs = await fetchLanguages(searchTxt);
    console.log(langs);
    this.setState({ fetchedLanguages: langs });
  };
  render() {
    console.log("APP render!!");
    return (
      <div>
        <form className="SearchInput">
          <InputTxtField onChange={this.handleInputChange} />
        </form>
        <SuggestionList fetchedLanguages={this.state.fetchedLanguages} />
      </div>
    );
  }
}

class InputTxtField extends React.Component {
  render() {
    console.log("inputTxt rendered");
    return (
      <div>
        <input
          className="SearchInput__input"
          type="text"
          placeholder="프로그램 언어를 입력하세요."
          onChange={this.props.onChange}
          ref={function (input) {
            //React.createRef 단축버전
            if (input != null) {
              input.focus();
            }
          }}
        />
      </div>
    );
  }
}

class SelectedList extends React.Component {
  render() {
    console.log("selected change");
    localStorage.setItem("selectedList", this.props.selectedList);
    return (
      <div className="SelectedLanguage">
        <ul>
          {this.props.selectedList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class SuggestionList extends React.Component {
  /*
<li className="Suggestion__item--selected">
                Action
                <span className="Suggestion__item--matched">Script</span>
              </li>
    */
  render() {
    if (this.props.fetchedLanguages.length === 0)
      return <div className="Suggestion" style={{ display: "none" }}></div>;
    else {
      return (
        <div className="Suggestion" style={{ display: "block" }}>
          <ul>
            {this.props.fetchedLanguages.map((item, idx) => {
              var className = "";
              {
                /* const spanClassName = "Suggestion__item--matched";
            var indexOfkeyword = []; */
              }
              if (idx === this.props.cursoredIndex)
                className = "Suggestion__item--selected";
              return (
                <li
                  key={idx}
                  onClick={this.handleSuggestionListClick}
                  className={className}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default App;
