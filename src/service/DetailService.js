import React, { Component } from 'react';
import axios from 'axios';
import UserDetail from '../component/UserDetail';
const URL = "https://api.github.com/"
class DetailService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            login: "",
            bio: "",
            company: "",
            followers: "",
            public_repos: "",
            repos: "",
            avatar: "",
            showData: false
        }
    }
    // Fetch requested users details
    componentDidMount() {
        let name = this.props.location.state.id;
        let api = URL + 'users/' + name;
        axios.get(api).then((res) => {
            this.setState({
                userName: res.data.name,
                login: res.data.login,
                bio: res.data.bio,
                company: res.data.company,
                followers: res.data.followers,
                public_repos: res.data.public_repos,
                avatar: res.data.avatar_url
            })
            api = api + '/repos';
            axios.get(api).then((res) => {
                this.setState({
                    repos: res.data,
                    showData: true
                })
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.showData ? <UserDetail data={this.state} /> : null}
            </div>
        )
    }
}

export default DetailService;