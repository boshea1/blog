import { useStoreActions, useStoreState } from "easy-peasy";
import {   useState } from "react";
import { addData, handleDel} from "../requests";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
const Blogs = () => {
// const [blogs, setBlogs] = useState([])
const [blog,setBlog] = useState('')
const [title,setTitle] = useState('')
const [edit,setEdit] = useState({id:null,title:'',post:''})
const loggedIn = useStoreState((state)=>state.loggedIn)
const blogs = useStoreState((state)=>state.blogs)
const setBlogs = useStoreActions((actions) => actions.setBlogs)

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

    const handleDelete = (id) => {
        const filtered = blogs.filter((post)=>post.id !== id)
        // setBlogs([...filtered])
        handleDel()
    }
    
    const handleEdit = (e) => {
        console.log(e)
        const mapped = blogs.map((item)=>item.id === edit.id? edit : item)
        setBlogs(mapped)
        setEdit({id:null,title:'',post:''})
    }

    const handleget = async() => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const querySnapshot1 = await querySnapshot
        const x = []
            for (var i in querySnapshot.docs){
        const id = querySnapshot1.docs[i]._document.data.value.mapValue.fields.id.integerValue
        const post = querySnapshot1.docs[i]._document.data.value.mapValue.fields.post.stringValue
        const title = querySnapshot1.docs[i]._document.data.value.mapValue.fields.title.stringValue
        const date = querySnapshot1.docs[i]._document.data.value.mapValue.fields.date.stringValue
        x.push({title,post,id,date})
    }

    return x
    }

    handleget().then(function(result){
        setBlogs(result)
    })

    
  
       

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
         onClick={(e)=>handleEdit(e)}>Submit</button>
         </>
        )
    }



    return (
        <div>
        <h1 className="text-red-600 text-center text-5xl p-3 m-4">Blog Articles</h1>
            {loggedIn? <div className="text-center object-center ">
            <label htmlFor="title" className="text-2xl md: block">Write a title</label>
            <input type='text' className="xl:mr-20 lg:mr-4 px-3 w-[700px] h-9 border-2 border-black rounded m-3"
            onChange={(e)=> setTitle(e.target.value)}/>
            <label htmlFor="textarea" className="text-2xl md: block">Write a new blog post</label>
         <textarea  className='border-black border-2 m-4 rounded p-3' name="textarea" id="textarea" cols="90" rows="10"
                    value={blog}onChange={(event)=> setBlog(event.target.value)} ></textarea>
         <button className=" border-2 border-black px-2 py-1 rounded object-center"
         onClick={()=>handleSubmit(blog, title, Math.floor(Math.random() * 10000))}>Submit</button>
            </div>: ''}
     
        <div>
            <h1 className="text-2xl mx-8 mt-6">Blog Post</h1>
            {blogs
            // .slice().reverse()
            .map((blogg)=>{
               return(
                   <div key={blogg.id} className="border-black border-2 my-10 mx-4 rounded">
                    <p className='mx-8 my-3 text-2xl'>{blogg.title}</p>
                   <p className='mx-8 my-10 text-lg'>{blogg.post}</p>
                   <p className='mx-8 my-10 text-sm'>{blogg.date}</p>
                  {loggedIn ? <div><button className="border-black border-2 rounded px-2 float-right top-0"
                           onClick={()=>{handleDelete(blogg.id)}}>Delete</button>
                   <button className="border-black border-2 rounded px-2 float-right top-0"
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