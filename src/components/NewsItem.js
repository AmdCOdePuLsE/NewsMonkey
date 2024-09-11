import React from 'react'

const NewsItem=(props)=>{
    let {title, description, imgUrl, url, author, date, source} = props;
    return (
        <div className="my-4">
          <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '88%', marginTop:'2%', zIndex:'1'}}>
                  {source}
                </span>
            <img src={!imgUrl?"https://c.ndtvimg.com/2024-07/t6vglvb_tree-tea-oil_625x300_19_July_24.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738?ver-20240615.100":imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {!author?"Anonymous":author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
         </div>
       </div>
    )
}

export default NewsItem
