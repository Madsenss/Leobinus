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
  if (props.categorys && props.categorys) {
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
          ? props.postData && props.postData.map((item, i)=>{
            return(
              <div key={i}>
                <div className="wrap">
                {
                  typeof (item.src) == 'string'
                  ? <img src={`/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                  : <img src={`/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                }
                  <div className="wrap-text" onClick={() => { navigate(`/detail/${item._id}`) }}>
                    <span style={{ fontFamily: item.font }}>{item.category}</span>
                    <p style={{ fontFamily: item.font }}>{item.title}</p>
                  </div>
                </div>
              </div>
            )
          })
          : null
        }
        {
          pathName === "/all"
          ? props.postData && props.postData.map((item, i)=>{
            return(
              <div key={i}>
                <div className="wrap">
                  {
                    typeof (item.src) == 'string'
                    ? <img src={`/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                    : <img src={`/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                  }
                <div className="wrap-text" onClick={() => { navigate(`/detail/${item._id}`) }}>
                  <span style={{ fontFamily: item.font }}>{item.category}</span>
                  <p style={{ fontFamily: item.font }}>{item.title}</p>
                </div>
                </div>
              </div>
            )
          })
          : null
        }
        {
          newPath && newPath.map((item, i)=>{
            return (
              pathName === item
              ? props.postData && props.postData.filter(v=> v.category === item.substring(1).toString()).map((item, i)=>{
                return (
                  <div key={i}>
                    <div className="wrap">
                      {
                        typeof(item.src) == 'string'
                        ? <img src={`/image/${item.src}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                        : <img src={`/image/${item.src[0]}`} alt={i} onClick={() => { navigate(`/detail/${item._id}`) }} />
                      }
                      <div className="wrap-text" onClick={() => { navigate(`/detail/${item._id}`) }}>
                        <span style={{ fontFamily: item.font }}>{item.category}</span>
                        <p style={{ fontFamily: item.font }}>{item.title}</p>
                      </div>
                    </div>
                  </div>
                )
              })
              : null
            )
          })
        }
      </Masonry >
    </>
  )
}

export default Posts;