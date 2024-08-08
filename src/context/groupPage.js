// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import services and helper functions
import { getSpecificGroup, leaveGroup, deleteGroup, joinGroup, getAllUserGroups } from '../services/groupService'
import { loggedInUser } from '../services/loggedUser'

// Import jsx components
import NavBar from '../components/navBar'
import Chat from '../components/chat'
import '../assets/styles/GroupsBrowser.css'

const GroupPage = () => {
    const { id } = useParams()
    const [group, setGroup] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [showJoinPopup, setShowJoinPopup] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        const fetchGroup = async () => {
            const groupData = await getSpecificGroup(id)
            if (groupData['status'] === 'successful') {
                setGroup(groupData['data'])
            }
            const userGroupsData = await getAllUserGroups(loggedInUser.getUserId())
            if (userGroupsData['status'] === 'successful') {
                for (const temp_group of userGroupsData['data']) {
                    if (temp_group['group_id'] === id) {
                        setShowJoinPopup(false)
                        setLoaded(true)
                        return
                    }
                }
                setLoaded(true)
            }
        }
    
        fetchGroup()
    }, [id])

    const handleLeaveGroup = async () => {
        const leaveGroupData = await leaveGroup(id, loggedInUser.getUserId())
        if (leaveGroupData['status'] === 'successful') {
            navigate('/groups')
        } else {
            alert('Failed to leave group, please try again')
        }
    }
    
    const handleDeleteGroup = async () => {
        const deleteGroupData = await deleteGroup(id)
        if (deleteGroupData['status'] === 'successful') {
            navigate('/groups')
        } else {
            alert('Failed to delete group, please try again')
        }
    }
    
    const confirmJoinGroup = async () => {
        const joinGroupData = await joinGroup(id, loggedInUser.getUserId())
        if (joinGroupData['status'] === 'successful') {
            setShowJoinPopup(false)
        } else {
            alert('Failed to join group, please try again')
        }
    }
    
    const cancelJoinGroup = () => {
        navigate('/groups')
        setShowJoinPopup(false)
    }

    if (!loaded) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div>
            <NavBar />
            <div className="group-page">
                <div className="header">
                    <h1>{group.name}</h1>
                    <p>{group.topic}</p>
                    <div className="button-group">
                        {!showJoinPopup ? (
                            <>
                                {!(group.owner_id === loggedInUser.getUserId()) && <button onClick={handleLeaveGroup}>Leave Group</button>}
                                {(group.owner_id === loggedInUser.getUserId()) && <button onClick={handleDeleteGroup}>Delete Group</button>}
                                <Chat chat_id={group.chat_id} />
                            </>
                        ) : (
                            <div className="popup">
                                <p>Do you want to join this group?</p>
                                <button onClick={confirmJoinGroup}>Yes</button>
                                <button onClick={cancelJoinGroup}>No</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
  
export default GroupPage