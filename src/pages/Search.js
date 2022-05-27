import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import InputSearch from '../components/InputSearch';
class Search extends Component {
  componentDidMount = () => {
    this.getData();
    (function () {
      var cx = 'e0395618f7a764d5c';
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    })();
  }
  getData = () => {
    var data = [".NET", "1С", "Analyst", "Android", "Architect", "Artist", "Big Data", "Blockchain", "C++", "Data Science", "DBA", "Design", "DevOps", "Embedded", "ERP/CRM", "Finances", "Flutter", "Front End", "Golang", "HR", "iOS/macOS", "Java", "Legal", "Marketing", "Node.js", "Office Manager", "Other", "PHP", "Product Manager", "Project Manager", "Python", "QA", "React Native", "Ruby", "Rust", "Sales", "Salesforce", "Scala", "Security", "SEO", "Support", "SysAdmin", "Technical Writer", "Unity",]
    var filteredData = data;
    this.setState({
      data,
      filteredData
    });
  };
  intl = (e) => {
    return this.props.intl.formatMessage({ id: e })
  }
  options = [
    { value: 'chocolate', label: this.intl('error.is_invalid') },
    { value: 'strawberry', label: this.intl('public_offer') },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  categogy = [".NET", "1С", "Analyst", "Android", "Architect", "Artist", "Big Data", "Blockchain", "C++", "Data Science", "DBA", "Design", "DevOps", "Embedded", "ERP/CRM", "Finances", "Flutter", "Front End", "Golang", "HR", "iOS/macOS", "Java", "Legal", "Marketing", "Node.js", "Office Manager", "Other", "PHP", "Product Manager", "Project Manager", "Python", "QA", "React Native", "Ruby", "Rust", "Sales", "Salesforce", "Scala", "Security", "SEO", "Support", "SysAdmin", "Technical Writer", "Unity",]
  state = {
    i: 0, n: 1,
    query: "",
    filteredData: [],
    data: []
  }
  aaa = (a) => {
    let n = +a?.queries?.request?.[0]?.totalResults;
    console.log("n: " + n)
    console.log("n.ceil: " + Math.ceil(n / 10))
    let nn = Math.ceil(n / 10)
    if (this.state.n < nn) {
      this.a((+this.state.n * 10) + 1)
      this.setState({ n: 1 + this.state.n });
    }
  }
  a = (n) => {
    console.log("aaaaa")
  }
  handleInputChange = event => {
    const intl = this.props.intl;
    const query = event.target.value;
    // console.log("++++++++++"+query)
    // console.log("++++++++++")
    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        element = this.object + '.' + element;
        // console.log(element)
        // console.log(intl.formatMessage({id: element}).toLowerCase())
        return intl.formatMessage({ id: element }).toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredData
      };
    });
  };
  chooseSelect = (e) => {
    var selected = e.target.getAttribute("data-val");
    this.setState({ selected: selected });
    console.log("this.state.selected: " + this.state.selected)
  }
  gcseSearchClick = e => {
    e.preventDefault();
    console.log(e)
  }
  change = (e, a) => {
    console.log("e", e)
    console.log("e.value", a)
    document.getElementById('gsc-i-id1').value = '' + a;
    document.querySelector(".gsc-search-button").click();
    let button = document.querySelector(".gsc-search-button-v2");
    if (button) {
      this.setState({ i: +this.state.i + 1 });
      // button.innerText="click_"+this.state.i;
      button.click();
      console.log("click");
      console.log(document.querySelectorAll(".gsc-webResult.gsc-result:not(.red)"));
      let elms = document.querySelectorAll(".gsc-webResult.gsc-result:not(.red)");
      if (elms) elms.forEach((item, i) => {
        item.classList.add("red")
        item.style.bacground = "#77777";
        item.addEventListener('click', e => {
          e.preventDefault();
          this.gcseSearchClick(e)
        })
      })
    }
    else {
      console.log("Error");
    }
  }
  setCategory = (e = 0) => {
    console.log("~~~setCategory: ", e)
    this.change(true, e)
  }
  cseSearchClick = e => {
    e.preventDefault();
    console.log("~~~e: ", e)
  }
  render() {
    return (
      <div className="main_wrapper">
        <div className="main_wrapper_block">
          <div className="main_wrapper_block_content_stretch">
            {/* <h1 onClick={this.a.bind(this, 1)}><FormattedMessage id="public_offer" /> */}
            {/* {this.state.data.map((key, i) => <div key={key}>i.title:  {key.title || key.htmlTitle}</div>)} */}
            {/* </h1> */}
            <InputSearch data={this.categogy} onChange={this.setCategory.bind(this)} />
            {/* <div className="gcse-searchbox" data-resultsUrl="http://www.example.com"
data-newWindow="true" data-queryParameterName="search" />` */}
            {/* 
<script async src="https://cse.google.com/cse.js?cx=e0395618f7a764d5c">
</script> */}
            {/* <div className={"select_search " + (this.state.showSelect ? "show" : "hide")}>
              <input
                placeholder={intl.formatMessage({ id: 'app.search' })}
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <ul>{this.state.filteredData.map((key, i) => <li key={key} onClick={this.chooseSelect.bind(this)} className={(this.state.selected === key && this.state.selected !== '') ? "selected" : ""} data-id={i} data-val={key} ><FormattedMessage id={this.object + '.' + key} /> </li>)}</ul>
            </div> */}
            <div className="gcse-search" ></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.currentUser
  //currentUser: state.reducer.currentUser
})
const mapDispatchToProps = dispatch => ({
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Search));
