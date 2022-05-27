import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import './PaginatedItems.css';
class PaginatedItems extends Component {
    click = e => {
        console.log("~Paginated Click: ", e, (+this.props.current + e))
        this.props.callback(+this.props.current + e)
    }
    inner=()=>{        
        const intl = this.props.intl
        let c = (+this.props.current) ? +this.props.current : 1,
            t = +this.props.total;
        console.log("PaginatedItems c:" + c + " t:" + t)
        if(this.props?.style==='more'){
            if(c < t)return(<div onClick={this.click.bind(this, +1)} className={"pagination_more"}><svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>{intl.formatMessage({ id: "pagination_more" })}</div>)
        return("hhh");
        } else if (t <= 1) {
            return('')
        } else if (c === 1) {
            return(<div onClick={this.click.bind(this, +1)} className="pagination_next">{intl.formatMessage({ id: "pagination_next" })}<svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg></div>);
        } else if (c >= t) {
            return(<>
                <div onClick={this.click.bind(this, -1)} className="pagination_prev">{intl.formatMessage({ id: "pagination_prev" })}</div>
                <div className="pagination_cuppent">{intl.formatMessage({ id: "pagination_page" })} {this.props.current}</div>
            </>);
        } else if (c < t) {
            return(<>
                <div onClick={this.click.bind(this, -1)} className={"pagination_prev"}><svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg></div>
                <div className="pagination_cuppent">{intl.formatMessage({ id: "pagination_page" })} {this.props.current}</div>
                <div onClick={this.click.bind(this, +1)} className={"pagination_next"}><svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg></div>
            </>);
        }
    }
    render() {
        if(this.props.total>0)
        return (
            <div className="pagination_container">
                {this.inner()}
            </div>
        )
        return ('')
    }
}
export default injectIntl(PaginatedItems);