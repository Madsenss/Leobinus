import Masonry from 'react-masonry-css'
import datas from '../dbdata/data.js'

const setColumn = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

function Posts(props) {
  return (
    
    <>
    <Masonry
      breakpointCols={setColumn}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {
        datas.map((item, i) => {
          return (
            <div key={i}>
              <div className='wrap'>
                <a href="/detail">
                  <img src={item.src} art={i} />
                </a>
                <div className='wrap-text'>
                  <h3>{props.postData}</h3>
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