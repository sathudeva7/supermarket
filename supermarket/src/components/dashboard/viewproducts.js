import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Background from '../images/a.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
var sectionStyle = {
    width: "100%",
    height: "600px",
    backgroundImage: `url(${Background})`
  };

export default class Viewproducts extends Component {
  
    state = {
        
        posts: []
    };

    componentDidMount = () => {
        this.getBlogPost();
    };

    getBlogPost = () => {
        axios.get('http://localhost:5000/products')
            .then((response) => {
                const data = response.data;
                this.setState({posts: data});
                console.log('Data has been received');
            })
            .catch(() => {
                alert('Error retriving data');
            });
    }

    handleChange = ({ target}) => {
        const {name,value} = target;
        this.setState({ [name]: value});
    };

    displayBlogPost = (posts) => {
        if(!posts.length) return null;

        return posts.map((post,index)=> (
            <div key={index}>
            <Card>
        <Card.Header as="h5">posted by {post.shopname}</Card.Header>
  <Card.Body>
        <Card.Title>{post.name}</Card.Title>
    <Card.Text>
      {post.description}<br></br>{post.price}
    </Card.Text>
    
    <Button variant="primary">Buy</Button>
  </Card.Body>
</Card>


</div>
        ));
    };

    render(){
        console.log('State',this.state);
        return (
            <section style={ sectionStyle }>
            <div><br></br><br></br> {this.displayBlogPost(this.state.posts)}  </div>
       </section>
        )
    }
}

