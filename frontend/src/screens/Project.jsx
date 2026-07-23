import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/user.context'
import { Group, PlusCircle, Send, Users, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../config/axios'


function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}
const Project = () => {
      const location = useLocation()

    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ selectedUserId, setSelectedUserId ] = useState(new Set()) 
    // const [ project, setProject ] = useState(location.state.project)
    const [ message, setMessage ] = useState('')
    const { user } = useContext(UserContext)
    const messageBox = createRef()

    const [ users, setUsers ] = useState([])
    const [ messages, setMessages ] = useState([]) 
    const [ fileTree, setFileTree ] = useState({})

    const [ currentFile, setCurrentFile ] = useState(null)
    const [ openFiles, setOpenFiles ] = useState([])

    const [ webContainer, setWebContainer ] = useState(null)
    const [ iframeUrl, setIframeUrl ] = useState(null)

    const [ runProcess, setRunProcess ] = useState(null)
    
    const handleUserClick = (id) => {
 setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });
};
    const addCollaborators=()=> {

        axiosInstance.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data)
            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })

    }
    useEffect(()=>{
      axiosInstance.get('/users/all').then(res => {

            setUsers(res.data.users)

        }).catch(err => {

            console.log(err)

        })
},[])
  return (
  <main className="flex h-screen w-screen bg-zinc-950 text-white relative overflow-hidden">
{isSidePanelOpen && (
  <div className={`absolute top-0 left-0 h-full w-2/7 border-r border-zinc-800 bg-zinc-900 flex flex-col z-10 transition-transform duration-300 ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
  <div className="flex items-center justify-between p-4 border-b border-zinc-800">
    <h3 className="text-sm font-semibold text-zinc-300">Members</h3>
    <button
      onClick={() => setIsSidePanelOpen(false)}
      className="text-zinc-400 hover:text-white transition-colors"
    >
      <X size={18} />
    </button>
  </div>
  <div className="flex flex-col p-3 gap-2 overflow-y-auto">
    {users.map((user) => (
      <div key={user._id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
          {user.email[0].toUpperCase()}
        </div>
        <span className="text-sm text-zinc-300 truncate">{user.email}</span>
      </div>
    ))}
  </div>
</div>
)}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Add Collaborators</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-auto h-80">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user._id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${selectedUserId.has(user._id) ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {user.email[0].toUpperCase()}
            </div>
            <span className="text-sm text-zinc-300 truncate">{user.email}</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2.5 rounded-lg text-sm font-semibold text-white">
        Add Collaborators
      </button>
    </div>
  </div>
)}

  <section className="w-2/7 border-r border-zinc-800 flex flex-col relative">
    <header className="p-4 border-b border-zinc-800 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-zinc-300">
        <button className='flex gap-2 cursor-pointer' onClick={()=>setIsModalOpen(!isModalOpen)}>
          <PlusCircle size={20}/>
          Add collaborator
        </button>
      </h2>
      <button
        className="text-zinc-400 hover:text-white transition-colors"
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
      >
        <Users size={20} />
      </button>
    </header>
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex justify-start">
          <div className="bg-zinc-800 text-sm text-zinc-200 px-4 py-2 rounded-2xl rounded-tl-none max-w-xs">
            <small className="block text-xs text-zinc-400 mb-1">mom20051909@gmail.com</small>
            <p>another person message nother person messag nother person messag</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-600 text-sm text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-xs">
            <small className="block text-xs text-blue-200 mb-1">you</small>
            <p>my message nother person messagnother person messagnother person messag</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-zinc-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter your message"
          className="flex-1 bg-zinc-800 text-sm text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 rounded-lg text-white">
          <Send size={18} />
        </button>
      </div>
    </div>
  </section>
  <section className="flex-1 flex items-center justify-center text-zinc-600">
    <p className="text-sm">Select a chat to start messaging</p>
  </section>

</main>
  )
}

export default Project