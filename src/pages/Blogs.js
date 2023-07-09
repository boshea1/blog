import { useStoreActions, useStoreState } from "easy-peasy";
import {    useEffect, useState } from "react";
import { addData, handleDel, handleUpdate} from "../requests";
import { collection, onSnapshot } from "firebase/firestore"; 
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Blogs = () => {
// const [blogs, setBlogs] = useState([])
const [blog,setBlog] = useState('')
const [title,setTitle] = useState('')
const [edit,setEdit] = useState({id:null,title:'',post:''})
// const loggedIn = useStoreState((state)=>state.loggedIn)
const blogs = useStoreState((state)=>state.blogs)
const setBlogs = useStoreActions((actions) => actions.setBlogs)
const [user,loading]=useAuthState(auth)

    const handleSubmit = (post, title, id) => {
        const date = new Date().toLocaleString()
        if (post && title){
            // setBlogs([...blogs, {title, post , date: new Date().toLocaleString(), id}])
            setBlog('')
            setTitle('')
        } else {
            if (title){
                alert('Enter a post')
            }
            else if (post){
                alert('Enter a title')
            }
            else {
                alert('Enter in a post and a title')
            }
        }
        addData(post, title, id, date)
    }

    const handleDelete = ({id}) => {
        // const filtered = blogs.filter((post)=>post.id !== id)
        // setBlogs([...filtered])
        handleDel(user.uid ,id)
    }
    
    const handleEdit = () => {
        
        // const mapped = blogs.map((item)=>item.id === edit.id? edit : item)
        // setBlogs(mapped)
        handleUpdate(edit, user.uid)
        setEdit({id:null,title:'',post:''})
    }

    
//         const handleget = async() => {
//             const querySnapshot = await getDocs(collection(db, "users"));
//             const querySnapshot1 =  querySnapshot
//             const x = []
//             console.log('rerndering')
//             for (var i in querySnapshot.docs){
//                 const id =querySnapshot1.docs[i].id
//                 // const id = querySnapshot1.docs[i]._document.data.value.mapValue.fields.id.integerValue
//                 const post = querySnapshot1.docs[i]._document.data.value.mapValue.fields.post.stringValue
//         const title = querySnapshot1.docs[i]._document.data.value.mapValue.fields.title.stringValue
//         const date = querySnapshot1.docs[i]._document.data.value.mapValue.fields.date.stringValue
//         x.push({title,post,id,date}) 
//     }  
//     return x
// }
// useEffect(()=>{
//     handleget().then(function(result){
//         setBlogs(result)
//     })
// },[setBlogs])


    useEffect(()=>onSnapshot(collection(db,'users', user.uid, 'posts'),(snapshot)=>{
        console.log(snapshot.docs.map(doc => doc.data()))
        console.log(snapshot.docs.map(doc => doc.id))
        setBlogs(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }),[setBlogs])
    // console.log('setblogs',blogs)



    
  
    

    if (edit.id) {
        return (
            <>
            <label htmlFor="title" className="text-2xl md: block">Edit title</label>
            <input type='text' className="px-3 w-[700px] h-9 border-2 border-black rounded m-3"
             value={edit.title} onChange={(e)=>setEdit({...edit,title: e.target.value})}/>
            <label htmlFor="textarea" className="text-2xl md: block">Edit post</label>
         <textarea  className='border-black border-2 m-4 rounded p-3' name="textarea" id="textarea" cols="90" rows="10"
                    value={edit.post} onChange={(e)=>setEdit({...edit,post: e.target.value})}></textarea>
         <button className=" border-2 border-black px-2 py-1 rounded object-center"
         onClick={()=>handleEdit()}>Submit</button>
         </>
        )
    }



    return (
      
          <div>
          <h1 className="text-red-600 text-center text-5xl p-3 m-4">Blog Articles</h1>
          {user? <div className="text-center items-center flex flex-col ">
          <label htmlFor="title" className="text-2xl md: block">Write a title</label>
          <input type='text' className="px-3 w-[600px] h-9 border-grey-900 border-4 rounded m-4"
          onChange={(e)=> setTitle(e.target.value)}/>
          <label htmlFor="textarea" className="text-2xl md: block">Write a new blog post</label>
          <textarea  className='border-grey-900 border-4 m-4 rounded p-3 shadow-2xl' name="textarea" id="textarea" cols="90" rows="10"
          value={blog}onChange={(event)=> setBlog(event.target.value)} ></textarea>
          <button className=" border-grey-900 bg-white border-4 px-2 py-1 rounded"
          onClick={()=>handleSubmit(blog, title, user.uid)}>Submit</button>
          </div>: ''}
          {/* Math.floor(Math.random() * 10000) */}
        
     
        <div>
            <h1 className="text-2xl mx-8 mt-6">Blog Post</h1>
            {blogs
            // .slice().reverse()
            .map((blogg)=>{
               return(
                   <div key={blogg.id} className="border-grey-900 bg-white border-4 my-10 mx-4 rounded shadow-lg">
                    <p className='mx-8 my-3 text-2xl'>{blogg.title}</p>
                   <p className='mx-8 my-10 text-lg'>{blogg.post}</p>
                   <p className='mx-8 my-10 text-sm'>{blogg.date}</p>
                  {user ? <div><button className="my-2 ml-2 border-grey-900 bg-white border-4 rounded px-2 float-right top-0"
                           onClick={()=>{handleDelete(blogg)}}>Delete</button>
                   <button className="my-2 border-grey-900 border-4 rounded px-2 float-right top-0 bg-white"
                            onClick={(e)=> 
                                    setEdit({id:blogg.id, title:blogg.title, post: blogg.post,date:blogg.date})}>Edit</button></div> : ''}
                </div>
                   
                   )
                })} 
        </div>
        </div>
        )


  };

  export default Blogs;