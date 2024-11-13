import Thumbnail1 from '../utils/blog1.jpg'
import Thumbnail2 from '../utils/blog2.jpg'
import Thumbnail3 from '../utils/blog3.jpg'
import Thumbnail4 from '../utils/blog4.jpg'

export const DUMMY_POSTS=[
    {   id:'1',
        thumbnail:Thumbnail1,
        category:'education',
        title:'This is the title of the very first post on this blog',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, iusto quia eos at, delectus debitis ad, quam quasi quis illo architecto consequuntur voluptatem! Doloribus alias quibusdam porro natus saepe consequuntur.',
        authorID:3
    },
    {   id:'2',
        thumbnail:Thumbnail2,
        category:'science',
        title:'This is the title of the very second post on this blog',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, iusto quia eos at, delectus debitis ad, quam quasi quis illo architecto consequuntur voluptatem! Doloribus alias quibusdam porro natus saepe consequuntur.',
        authorID:1
    },
    {   id:'3',
        thumbnail:Thumbnail3,
        category:'education',
        title:'This is the title of the very third post on this blog',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, iusto quia eos at, delectus debitis ad, quam quasi quis illo architecto consequuntur voluptatem! Doloribus alias quibusdam porro natus saepe consequuntur.',
        authorID:6
    },
    {   id:'4',
        thumbnail:Thumbnail4,
        category:'farming',
        title:'This is the title of the very fourth post on this blog',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, iusto quia eos at, delectus debitis ad, quam quasi quis illo architecto consequuntur voluptatem! Doloribus alias quibusdam porro natus saepe consequuntur.',
        authorID:11
    }]

    const modules={
        toolbar:[
          [{'header':[1,2,3,4,5,false]}],
          ['bold','italic','underline','strike','blockquote'],
          [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
          ['link','image'],
          ['clean']
        ]
      }
      const formats=[
        'header',
        'bold','italic','underline','strike','blockquote',
        'list','bullet','indent',
        'link','image'
      ]