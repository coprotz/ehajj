import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "./useAuth"


const useData = () => {
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, 'messages')
    const [pilgrims, setPilgrims] = useState([])
    const pilgrimsRef = collection(db, 'pilgrims')
    const [chats, setChats] = useState([])
    const chatsRef = collection(db, 'chats')
    const [agents, setAgents] = useState([])
    const agentsRef = collection(db, 'agents')
    const [users, setUsers] = useState([])
    const usersRef = collection(db, 'users')
    const [groups, setGroups] = useState([])
    const groupsRef = collection(db, 'groups')
    const [payments, setPayments] = useState([])
    const [dashAgents, setDashAgents] = useState([])
    const [dashPilgrims, setDashPilgrims] = useState([])
    const paymentsRef = collection(db, 'payments')


    const q = query(messagesRef, orderBy("createdAt"));
    const dashAgen = query(agentsRef, orderBy("timeStamp"), limit(3))
    const dashPil = query(pilgrimsRef, orderBy("createdAt"), limit(3))

    useEffect(() => {
        onSnapshot(dashPil, snapshot => {
            setDashPilgrims(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(dashAgen, snapshot => {
            setDashAgents(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(pilgrimsRef, snapshot => {
            setPilgrims(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(groupsRef, snapshot => {
            setGroups(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(agentsRef, snapshot => {
            setAgents(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(chatsRef, snapshot => {
            setChats(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(usersRef, snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(paymentsRef, snapshot => {
            setPayments(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    return { messages, pilgrims, chats, agents, users, groups, payments, dashAgents, dashPilgrims }
}

export default useData;