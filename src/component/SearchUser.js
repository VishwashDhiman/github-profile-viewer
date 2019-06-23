import React, { Component } from 'react';
import UserService from '../service/UserService';
class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            search: false
        }
    }
    // Triggers only when 'Enter' is pressed. 
    key = (e) => {
        this.setState({ search: false })
        if (e.key === 'Enter') {
            this.setState({
                userName: e.target.value,
                search: true
            })
        }
    }
    // Setting state's data recieved from child.
    show = (value) => {
        this.setState({ search: value })
    }
    render() {
        return (
            <div className="row">
                <div className="col s12" style={{ backgroundColor: '#ECEFF1', paddingBottom: '30px' }}>
                    <div className="col s12 m8 offset-m4" >
                        <h3>GitHub Profile Viewer</h3>
                        <div className="col s12 m6">
                            <div className="nav-wrapper" style={{ backgroundColor: '#80DEEA', padding: '10px' }}>
                                <div className="input-field" >
                                    <input id="search" type="search" onKeyDown={this.key} />
                                    <label className="label-icon" style={{ color: "white" }} htmlFor="search"><i className="material-icons">search</i></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12">
                    {this.state.search ? <UserService userName={this.state.userName} show={this.show} /> : null}
                </div>
            </div>

        )
    }
}

export default SearchUser