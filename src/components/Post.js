import React from "react";
import axios from 'axios';

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            editStatus: false,
            textField: "",
            textArea: ""
        }
    }
    handleClick = e => {
        this.setState({editStatus: false});
        axios.put(`/api/post/${this.props.id}`, {
            comment: this.state.textArea,
            title: this.state.textField
        }).then(response => {
            this.props.updateTours(response.data)
        })
    }
    handleDelete = () => {
        axios.delete(`api/post/${this.props.id}`).then(response => {
            this.props.updateTours(response.data);
        })
    }
    render(){
        return (
            <div>
                {
                    this.state.editStatus === false ?
                    <>
                    <h1>{this.props.postTitle}</h1>
                    <h2>{this.props.postComment}</h2>
                    </>
                    :
                    <>
                    <input defaultValue={this.props.postTitle}
                    onChange={e => this.setState({textField: e.target.value})} />
                    <textarea defaultValue={this.props.postComment}
                    onChange ={(e) => this.setState({textArea: e.target.value})}>
                    </textarea>
                    </>
                }
                {
                    this.props.onGuideProfile === true ?
                    <>
                    {this.state.editStatus === false ?
                    <button onClick={() => this.setState({editStatus: true})}>
                        Edit Tour
                    </button> 
                  :
                   <button onClick={this.handleClick}>
                       Save
                   </button> 
                }
                <button onClick={this.handleDelete}>
                    delete
                </button>
                </>
                :
                <button>apply</button>
                }
            </div>
        )
    }
}

export default Post;