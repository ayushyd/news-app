import React, { Component } from 'react'

export default class NewsItems extends Component {
   
  render() {
    let {author, title, description, imageUrl,newsUrl, date, source} = this.props;
    const defaultImage = "https://source.unsplash.com/random/300x200"
    return (
      <div>
         <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {source}
        </span>
        <img src={imageUrl|| defaultImage} className="card-img-top" alt="News"/>
        <div className="card-body">
            <h4 className='card-title'>{author}</h4>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sn btn-primary">Read More</a>
            <p className='card-title my-3'>{new Date(date).toGMTString()}</p>
        </div>
        </div>
      </div>
    )
  }
}
