import React from "react";
import axios from 'axios';

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            editStatus: false,
            textField: "",
            textArea: "",
            picture1: "",
            picture2: "",
            picture3: ""
        }
    }
    handleClick = e => {
        this.setState({editStatus: false});
        axios.put(`/api/post/${this.props.id}`, {
            comment: this.state.textArea,
            title: this.state.textField,
            pic1: this.state.picture1,
            pic2: this.state.picture2,
            pic3: this.state.picture3
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
            <div className="posts"> 
            
                {
                    this.state.editStatus === false ?
                    <>
                    <h1>{this.props.postTitle}</h1>
                    <h2>{this.props.postComment}</h2>
                    <h2>{this.props.picture1}</h2>
                    <h2>{this.props.picture2}</h2>
                    <h3>{this.props.picture3}</h3>
                    </>
                    :
                    <>
                    <input onChange={e => this.setState({textField: e.target.value})} 
                    defaultValue={this.props.postTitle}/>
                    <textarea onChange ={(e) => this.setState({textArea: e.target.value})}
                    defaultValue={this.props.postComment}>
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