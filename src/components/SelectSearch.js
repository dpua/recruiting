import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
class SelectSearch extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showSelect: false,
    query: "",
    filteredData: [],
    data: [],
    keys: 'qqq'
  }
  componentDidMount = () => {
    this.getData();
  }
  getData = () => {
    var query = this.props.query;
    var data = this.props.data;
    var filteredData = data;
    this.setState({
      query,
      data,
      filteredData
    });
  };
  handleInputChange = event => {
    const intl = this.props.intl;
    const query = event.target.value;
    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        console.log(element + ' ' + intl.formatMessage({ id: element }))
        return (element + ' ' + intl.formatMessage({ id: element })).toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredData
      };
    });
  };
  chooseSelect = (e) => {
    var selected = e;
    this.setState({ selected: selected, query: selected });
    console.log("this.state.selected: " + selected)
    this.props.onChange(selected)
    this.setState({ showSelect: false })
  }
  handleKeyDown = (e) => {
    this.setState({
      keys: e.key
    })
    if (e.key === 'Enter') {
      console.log('do validate');
      this.props.onChange(this.state.query)
      this.setState({ showSelect: false })
    }
  }
  handleBlur(e) {
    const currentTarget = e.currentTarget;
    if (!currentTarget.contains(document.activeElement)) {
      console.log('!contains blur', e.target.tagName, e.currentTarget);
      this.props.onChange(this.state.query)
      this.setState({ showSelect: false })
    } else {
      console.log('contains blur', e.target.tagName, e.currentTarget);
    }
  }
  render() {
    const intl = this.props.intl;
    return (
      <div className={"select_search " + (this.state.showSelect ? "show" : "hide")} value={this.state.query}
        onFocus={(e) => {
          console.log('onFocus input');
          this.setState({ showSelect: true })
        }}
        onBlur={this.handleBlur.bind(this)}>
        <input
          placeholder={intl.formatMessage({ id: 'app.search' })}
          value={this.state.query}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyPress={this.handleKeyDown.bind(this)}
          onFocus={(e) => {
            console.log('Focused on input');
            this.setState({ showSelect: true })
          }}
        />
        <ul className={"select_search_list " + (this.state.showSelect ? "show" : "hide")}>{this.state.filteredData.map((key, i) => <li key={"s" + key} tabIndex={i} onClick={this.chooseSelect.bind(this, key)} className={(this.state.selected == key && this.state.selected !== '') ? "selected" : ""} >
          {key} {intl.formatMessage({ id: key })}
        </li>)}</ul>
      </div>
    )
  }
}
export default injectIntl(connect(null, null)(SelectSearch));