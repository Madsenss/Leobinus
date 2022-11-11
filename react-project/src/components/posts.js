import Masonry from 'react-masonry-css'
import datas from '../dbdata/data.js'
import { useNavigate } from 'react-router-dom'
const setColumn = {
  default: 3,
  1100: 3,
  700: 2,
  500: 2
};

function Posts(props) {
  let navigate = useNavigate();
  return (
    
    <>
    <Masonry
      breakpointCols={setColumn}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {/* <div>
       <div className='wrap'>
        <a href="/detail">
          <img src={`http://localhost:8080/image/${props.test.src[0]}`} alt="test" />
        </a>
        <div className='wrap-text'>
          <h3 style={{fontFamily : props.test.font }}>{props.test.category}</h3>
          <h2 style={{fontFamily : props.test.font }}>{props.test.title}</h2>
        </div>
        </div>
      </div> */}
      {
        datas.map((item, i) => {
          return (
            <div key={i}>
              <div className='wrap'>
                <img src={item.src} alt={i} onClick={()=>{navigate('/detail')}} />
                <div className='wrap-text'>
                  <h3 style={{fontFamily : item.font}}>{item.category}</h3>
                  <h2 style={{fontFamily : item.font}}>{item.title}</h2>
                </div>
              </div>
            </div>
          )
        })
      }
    </Masonry >
    </>
  )
}

export default Posts;