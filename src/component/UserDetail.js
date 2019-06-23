import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserDetail extends Component {
    render() {
        // Destructures data from props
        let { userName, bio, company, followers, login, public_repos, repos, avatar } = this.props.data
        return (
            <div className="row left-align">
                <div className="col s12" style={{ backgroundColor: '#ECEFF1', paddingBottom: '30px' }}>
                    <div className="col s12">
                        <Link to="/"><span><i className="material-icons">reply</i></span>Back</Link>
                    </div>
                    <div className="col s12" style={{ marginTop: '50px' }}>
                        <div className="col s12 m2">
                            <img
                                style={{ height: '150px', width: '150px' }}
                                src={avatar}
                                alt={login}
                                className="responsive-img" />
                        </div>
                        <div className="col s12 m10">
                            <h5>{userName}</h5>
                            <p>@{login}</p>
                        </div>
                    </div>
                </div>
                <div className="col s12">
                    <div className="col s12 m12">
                        <h5 style={{ color: "#546E7A" }}>Bio</h5>
                        <p>{bio ? bio : 'No bio available'}</p>
                    </div>
                    <div className="col s12 m12">
                        <h5 style={{ color: "#546E7A" }}>Works at</h5>
                        <p>{company ? company : 'Not started yet'}</p>
                    </div>
                    <div className="col s12 m6">
                        <h5 style={{ color: "#546E7A" }}>Repository</h5>
                        <p>{public_repos}</p>
                    </div>
                    <div className="col s12 m6">
                        <h5 style={{ color: "#546E7A" }}>Followers</h5>
                        <p>{followers}</p>
                    </div>
                </div>
                <div className="col s12">
                    <h5 style={{ color: "#546E7A" }}>Pinned Repositories</h5>
                    {repos.map((value, key) => {
                        return (
                            <div className="col s12 m8 offset-m2 center-align" key={key}>
                                <div className="card-panel grey lighten-5 z-depth-1">
                                    <div className="valign-wrapper">
                                        <div className="col s4 m2">
                                            <img src={avatar} alt="" className="circle responsive-img" />
                                        </div>
                                        <div className="col s8 m19">
                                            <p><strong>{value.name}</strong></p>
                                            <span className="black-text">
                                                {value.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        )
    }
}

export default UserDetail