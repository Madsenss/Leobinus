import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

var datas = [ // db에서 src 받아와서 넣기
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: '/logo.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/5.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/6.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/7.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/8.jpg' },

]

const Posts = datas.map((item) => {
  <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
  return (
    <>
    <div>
      <div className='wrap'>
        <img src={item.src} art="" />
        <div className='wrap-text'>
          <h3>1</h3>
        </div>
      </div>  
    </div>
    </>
  )
  </Masonry >
});

export default Posts;