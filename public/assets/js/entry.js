var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./CommentBox');

ReactDOM.render(
    <CommentBox url="/data/" pollInterval={2000} />,
    document.getElementById('commentbox')
);

/*
const CustomComponent = React.createClass({
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

const listgroupInstance = (
    <ListGroup>
        <CustomComponent header="Heading 1" href="/abc">Some body text</CustomComponent>
        <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
        <CustomComponent header="Heading 3">Danger styling</CustomComponent>
        <CustomComponent header="Heading 3">Danger styling</CustomComponent>
        <CustomComponent header="Heading 3">Danger styling</CustomComponent>
        <ListGroupItem header="Heading 3">Danger styling</ListGroupItem>
        <ListGroupItem header="Heading 3">Danger styling</ListGroupItem>
    </ListGroup>
    );

ReactDOM.render(listgroupInstance, document.getElementById('commentbox'));
    */