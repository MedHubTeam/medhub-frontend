// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Import services and helper functions
import { getAllGroups, createGroup, getAllUserGroups } from '../services/groupService'
import { loggedInUser } from '../services/loggedUser'

// Import jsx components
import NavBar from '../components/navBar'
import '../assets/styles/GroupsBrowser.css'

const GroupBrowserPage = () => {
    const [groups, setGroups] = useState([])
    const [myGroups, setMyGroups] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')
    const [newGroupTopic, setNewGroupTopic] = useState('')
    const [loadedMyGroups, setLoadedMyGroups] = useState(false)
    const [loadedAllGroups, setLoadedAllGroups] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])

    const fetchAllGroups = async () => {
        const allGroupsData = await getAllGroups()
        if (allGroupsData['status'] === 'successful') {
            setGroups(allGroupsData['data'])
        }
        setLoadedAllGroups(true)
    }

    const fetchMyGroups = async () => {
        const allUserGroupsData = await getAllUserGroups(loggedInUser.getUserId())
        if (allUserGroupsData['status'] === 'successful') {
            setMyGroups(allUserGroupsData['data'])
        }
        setLoadedMyGroups(true)
    }

    useEffect(() => {
        fetchAllGroups()
        fetchMyGroups()
    }, [])

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        const createGroupData = await createGroup(newGroupName, newGroupTopic, loggedInUser.getUserId())
        if (createGroupData['status'] === 'successful') {
            fetchAllGroups()
            fetchMyGroups()
        } else {
            alert('Failed to create group, please try again')
        }
    }
    
    if (!loadedAllGroups || !loadedMyGroups) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div>
            <NavBar />
            <h1>Groups Browser</h1>

            <section className="create-group">
                {showCreateForm ? (
                    <form onSubmit={handleCreateGroup}>
                        <div>
                            <label htmlFor="group-name">Group Name:</label>
                            <input
                                type="text"
                                id="group-name"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="group-topic">Group Topic:</label>
                            <input
                                type="text"
                                id="group-topic"
                                value={newGroupTopic}
                                onChange={(e) => setNewGroupTopic(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Create Group</button>
                        <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </form>
                ) : (
                    <button onClick={() => setShowCreateForm(true)}>Create New Group</button>
                )}
            </section>

            <section className="my-groups">
                <h2>My Groups</h2>
                <div className="groups-page">
                    {myGroups.map(group => (
                        <div key={group.group_id} className="group-tile">
                            <Link to={`/groups/${group.group_id}`} className="link-styled">
                                <h3>{group.name}</h3>
                                <p>{group.topic}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="all-groups">
                <h2>All Groups</h2>
                <div className="groups-page">
                    {groups.map(group => (
                        <div key={group.group_id} className="group-tile">
                            <Link to={`/groups/${group.group_id}`} className="link-styled">
                                <h3>{group.name}</h3>
                                <p>{group.topic}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
  
export default GroupBrowserPage