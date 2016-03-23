var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');
var $ =  jQuery = require('jquery');
require('blueimp-file-upload');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
/*
var Comment = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
          {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
            );
    }
});
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
          {comment.text}
                </Comment>
                );
        });
        return (
            <div className="commentList" >
                {commentNodes}
            </div>
            );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="你的名字" ref="author" />
                <input type="text" placeholder="说些什么..." ref="text" />
                <input type="submit" value="发表" />
            </form>
            );
    }
});
*/
const CustomComponent = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var header = this.refs.header.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !header) {
            return;
        }
        this.props.onCommentSubmit({header: header, text: text});
        this.refs.header.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function() {
        return (
            <a className="list-group-item" href={this.props.href}>
                <span className="list-group-item-right glyphicon glyphicon-chevron-right"></span>
                <h4 className="list-group-item-heading">{this.props.header}</h4>
                <p className="list-group-item-text" >{this.props.children}</p>
            </a>
            );
    }
});

const CustomComponentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <CustomComponent header={comment.name} href={comment.href}>
                    {comment.description}
                </CustomComponent>
                );
        });
        return (
            <ListGroup>
                {commentNodes}
            </ListGroup>
            );
    }
});

const NavJustified = React.createClass({
    handleClick: function() {
        event.preventDefault();
        this.refs.selectInput.click();
    },
    handleChange: function(event){
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        console.log('handleChange:'+files);
        $(this.refs.selectInput).fileupload({
            url: '/file/root/',
            dataType: 'json',
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    console.log(file.name);
                });
            },
            fail: function (e, data) {
                console.log('fail:'+data);
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                console.log(progress);
            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    },
    propTypes: {
        //onChange: React.PropTypes.func.isRequired,
        //multiple: React.PropTypes.bool
    },
    render: function() {
        var divStyle = {
            'font-size':"400%"
        };
        return (
            <div id="footer" className="container">
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <ul className="nav nav-pills nav-justified">
                        <li role="presentation"><a href="#" ><span className="glyphicon glyphicon-plus" style={{'fontSize':"400%"}}></span></a></li>
                        <li role="presentation">
                            <a href="#" onClick={this.handleClick}><span className="glyphicon glyphicon-upload" style={{'fontSize':"400%"}}></span></a>
                            <form encType="multipart/form-data" className="hidden">
                                <input name="file" type="file" className="hidden" ref="selectInput" multiple="multiple" onChange={this.handleChange}/>
                                <input type="button" value="Upload" className="hidden" ref="uploadInput"/>
                            </form>
                        </li>
                        <li role="presentation"><a href="#"><span className="glyphicon glyphicon-search" style={{'fontSize':"400%"}}></span></a></li>
                    </ul>
                </nav>
            </div>
            );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        var pathname = window.location.pathname;
        var url = '/data' + pathname.substr(5);//把view换为data
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        // TODO: submit to the server and refresh the list
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
    },
    render: function() {
        var options={
            basUrl:'http://127.0.0.1',
            param:{
                fid:0
            }
        }
        return (
            <div>
                <CustomComponentList data={this.state.data} />
                <NavJustified />
            </div>
            );
    }
});

module.exports = CommentBox;