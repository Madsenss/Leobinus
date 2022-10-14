import Masonry from 'react-masonry-css'
import datas from '../dbdata/data.js'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

function Posts() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {
        datas.map((item, i) => {
          return (
            <div key={i}>
              <div className='wrap'>
                <img src={item.src} art="" />
                <div className='wrap-text'>
                  <h3>1</h3>
                </div>
              </div>
            </div>
          )
        })
      }
    </Masonry >
  )
}

export default Posts;