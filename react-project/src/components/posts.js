import Masonry from 'react-masonry-css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const setColumn = {
  default: 3,
  1100: 3,
  700: 2,
  500: 2
};

function Posts(props) {
  let navigate = useNavigate();
  let pathName = window.location.pathname;
  let [path] = useState([]);
  if (props.categorys != undefined) {
    for (let i = 0; i < props.categorys.length; i++) {
      path.push("/" + props.categorys[i].category);
    }
  }
  let set = new Set(path);
  let newPath = [...set];
  return (
    <>
      <Masonry
        breakpointCols={setColumn}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          pathName === "/"
            ? props.postData != undefined
              ? props.postData.map((item, i) => {
                return (
                  <div key={i}>
                    <div className='wrap'>
                      {
                        typeof (item.src) == 'string'
                          ? <img src={`http://localhost:8080/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                          : <img src={`http://localhost:8080/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                      }
                      <div className='wrap-text'>
                        <h3 style={{ fontFamily: item.font }}>{item.category}</h3>
                        <h2 style={{ fontFamily: item.font }}>{item.title}</h2>
                      </div>
                    </div>
                  </div>
                )
              })
              : null
            : null
        }
        {
          pathName === "/all"
            ? props.postData != undefined
              ? props.postData.map((item, i) => {
                return (
                  <div key={i}>
                    <div className='wrap'>
                      {
                        typeof (item.src) == 'string'
                          ? <img src={`http://localhost:8080/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                          : <img src={`http://localhost:8080/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                      }
                      <div className='wrap-text'>
                        <h3 style={{ fontFamily: item.font }}>{item.category}</h3>
                        <h2 style={{ fontFamily: item.font }}>{item.title}</h2>
                      </div>
                    </div>
                  </div>
                )
              })
              : null
            : null
        }

        {
          newPath != undefined
          ? newPath && newPath.map((item)=>{
            return(
              pathName === item
              ? props.postData != undefined
                ? props.postData.filter(v=> v.category === item.substring(1).toString()).map((item, i)=>{
                    return(
                      <div key={i}>
                      <div className='wrap'>
                        {
                          typeof(item.src) == 'string'
                          ? <img src={`http://localhost:8080/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                          : <img src={`http://localhost:8080/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                        }
                        <div className='wrap-text'>
                          <h3 style={{ fontFamily: item.font }}>{item.category}</h3>
                          <h2 style={{ fontFamily: item.font }}>{item.title}</h2>
                        </div>
                      </div>
                    </div>
                    )
                  })
                : null
              : null
            )
          })
          : null
        }
      </Masonry >
    </>
  )
}

export default Posts;