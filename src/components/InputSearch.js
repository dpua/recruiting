import React, { Component} from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './InputSearch.css';
import Id from '../utils/newId';
class InputSearch extends Component {
  state = {
    id:0,
    placeholder:'',
    showSelect: false,
    query: "",
    filteredData: [],
    translate: false,
    onlySelect: false,
    data: [],
  }
  componentDidMount = () => {
    this.getData();
  }
  getData = () => {
    const 
    id=Id("search_"),
    placeholder=this.props.placeholder,
    query = this.props.query,
    data = this.props.data,
    filteredData = data,
    translate = this.props.translate,
    onlySelect=this.props.onlySelect;
    this.setState({
      id,
      placeholder,
      query,
      data,
      filteredData,
      translate,
      onlySelect
    });
  };
  handleInputChange = event => {
    const intl = this.props.intl;
    const query = event.target.value;
    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return (this.state.translate)?
        (element +' '+intl.formatMessage({ id: element })).toLowerCase().includes(query.toLowerCase()):
        element.toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredData
      };
    });
    if(!this.state.onlySelect)this.props.onChange(query)
  };
  chooseSelect = (e) => {
    var selected = e;
    this.setState({ selected: selected, query: selected });
    console.log("this.state.selected: " + selected)
    this.props.onChange(selected)
    this.setState({ showSelect: false })
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      this.setState({ showSelect: false })
      if(!this.state.onlySelect)this.props.onChange(this.state.query)
    }
  }
  handleBlur(e) {
    const currentTarget = e.currentTarget;
    if (!currentTarget.contains(document.activeElement)) {
      console.log('!contains blur', e.target.tagName, e.currentTarget);
      this.setState({ showSelect: false })
    } else {
      console.log('contains blur', e.target.tagName, e.currentTarget);
    }
  }
  render() {
    const intl = this.props.intl;
    return (
      <div className={"select_search searchformfld " + (this.state.showSelect ? "show" : "hide")} value={this.state.query}
        onFocus={(e) => {
          console.log('onFocus input');
          this.setState({ showSelect: true })
        }}
        onBlur={this.handleBlur.bind(this)}>
        <input id={this.state.id}
          placeholder=" "
          value={this.state.query}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyPress={this.handleKeyDown.bind(this)}
        /><label htmlFor={this.state.id}>{intl.formatMessage({ id: (this.state.placeholder)?this.state.placeholder:'app.search' })}</label>
        <div className="select__indicators">
          <span className="select__indicator-separator"></span>
          <svg className="select__dropdown-indicator" height="20" width="20" viewBox="0 0 20 20" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </div>
        <ul className={"select_search_list " + ((this.state.showSelect && this.state.filteredData.length>0)? "show" : "hide")}>{this.state.filteredData.map((key, i) => <li tabIndex={i} key={"s" + key} onClick={this.chooseSelect.bind(this, key)} className={(this.state.selected === key && this.state.selected !== '') ? "selected" : ""} >
          {(this.state.translate)?key +' '+intl.formatMessage({ id: key }):key}
        </li>)}</ul>
      </div>
    )
  }
}
export default injectIntl(connect(null, null)(InputSearch));