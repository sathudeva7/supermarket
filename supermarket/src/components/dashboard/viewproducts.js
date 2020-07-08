import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck'
import Background from '../images/a.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import axios from 'axios';
var sectionStyle = {
    backgroundsize: "cover",   
    
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
            <Container>
                <Col lg={6} md={8} xs={1} >
                <div className="row">
                 <div className="col s12 center-align">
                <div className="col s4">
                <div key={index}>
              
                <Card style={{ width: '18rem' }}>
                <Card.Header as="h5">posted by {post.shopname}</Card.Header>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>{post.name}</Card.Title>
    <Card.Text>
    {post.description}<br></br>{post.price}
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
             

</div>

                    </div>
                </div>
            </div>
            </Col>
               
            </Container>
            
            
        ));
    };



    render(){
        console.log('State',this.state);
        return (
            
            <section style={ sectionStyle }>
                <Col>

                <div>{this.displayBlogPost(this.state.posts)}  </div>
                </Col>
               
                  
            
       </section>
        )
    }
}




