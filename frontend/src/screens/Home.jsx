import React, { useContext, useState } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, Folder, X } from 'lucide-react'
import { useEffect } from 'react'
import axiosInstance from '../config/axios'

const Home = () => {
  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

   function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axiosInstance.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    console.log(projects)
    useEffect(() => {
        axiosInstance.get('/projects/all').then((res) => {
            setProjects(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {user?.email && `Logged in as ${user.email}`}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2.5 rounded-lg text-sm font-semibold"
        >
          <FolderPlus size={18} />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-3 text-zinc-600">
          <Folder size={48} />
          <p className="text-lg font-medium">No projects yet</p>
          <p className="text-sm">Click "New Project" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-blue-600 hover:bg-zinc-800 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Folder size={20} className="text-blue-400" />
                </div>
                <h2 className="font-semibold text-white text-sm truncate group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h2>
              </div>
              <p className="text-xs text-zinc-500">
               Total Collaborators : {project.users.length}
              </p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createProject}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home