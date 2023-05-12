import React from "react";
import { fetchLanguages } from "./api";

class App extends React.Component {
  state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };
  handleSuggestionListChange = (list) => {
    this.setState({ suggestionList: list });
  };
  handleSuggestionListClick = (item) => {
    const MAX_SIZE = 5;
    var newList = [];
    if (this.state.selectedList.includes(item)) {
      //set it to last
      newList = this.state.selectedList.filter((item_) => item !== item_);
      newList.push(item);
      this.setState({ selectedList: newList });
    } else if (this.state.selectedList.length >= MAX_SIZE) {
      //FIFO
      newList = [...this.state.selectedList];
      newList.shift();
      newList.push(item);
    } else {
      newList = [...this.state.selectedList, item];
    }
    this.setState({ selectedList: newList });
  };
  handleCursorIndex = (index) => {
    this.setState({ cursoredIndex: index });
  };
  render() {
    console.log("APP render!!");
    return (
      <div className="App">
        <form className="SearchInput">
          <InputTxtField
            suggestionList={this.state.suggestionList}
            handleSuggestionListChange={this.handleSuggestionListChange}
            handleSuggestionListClick={this.handleSuggestionListClick}
            cursoredIndex={this.state.cursoredIndex}
            handleCursorIndex={this.handleCursorIndex}
          />
          <SuggestionList />
        </form>
      </div>
    );
  }
}

class InputTxtField extends React.Component {
  state = {
    keyword: "",
  };
  handleInputChange = async (e) => {
    const searchTxt = e.target.value;
    setTimeout(() => {
      if (searchTxt === e.target.value) this.setState({ keyword: searchTxt });
    }, 400);
    const langs = await fetchLanguages(searchTxt);
    console.log(langs);
    //this.props.handleSuggestionListChange(res); //
  };
  handleKeyPress = (e) => {
    if (e.code === "ArrowDown") {
      if (this.props.cursoredIndex >= this.props.suggestionList.length - 1) {
        this.props.handleCursorIndex(0);
      } else this.props.handleCursorIndex(this.props.cursoredIndex + 1);
    } else if (e.code === "ArrowUp") {
      if (this.props.cursoredIndex === 0) return;
      this.props.handleCursorIndex(this.props.cursoredIndex - 1);
    } else if (e.code === "Enter") {
      e.preventDefault();

      alert(this.props.suggestionList[this.props.cursoredIndex]);
      this.props.handleSuggestionListClick(
        this.props.suggestionList[this.props.cursoredIndex]
      );
    }
  };
  render() {
    console.log("inputTxt rendered");
    return (
      <input
        className="SearchInput__input"
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        value={this.state.keyword}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyPress}
        ref={function (input) {
          //React.createRef 단축버전
          if (input != null) {
            input.focus();
          }
        }}
      />
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
  render() {
    return <div className="Suggestion"></div>;
  }
}

export default App;
