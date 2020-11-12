import React, {useEffect, useState} from 'react'
import api from '@/util/api'
import Button from '@components/button'
import ConfirmPassModal from '@components/confirm-pass-modal'

const BrowserSessions = () => {
    const [sessions, setSessions]     = useState(null)
    const [confirming, setConfirming] = useState(false)
    const [password, setPassword]     = useState('')

    const loadSessions = () => api().get('user/sessions').then(({data}) => {
        setSessions(data)
    });

    useEffect(() => {
        loadSessions()
    }, [])

    const logOutAll = () => {
        api().post('user/sessions/purge', {password}).then(() => {
            setConfirming(false)

            loadSessions()
        }).catch(({errors}) => {
            alert(errors[0])
        })
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Logged In Sessions
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-12">
                                {sessions === null ? 'Loading' : sessions.map((session, i) => (
                                    <div key={i}
                                         className={`p-2 rounded-md ${session.isCurrentDevice ? 'bg-green-100' : ''}`}>
                                        <div className="flex items-center space-x-1">
                                            <div>{session.ip}</div>
                                            <div>- {session.agent.browser} ({session.agent.platform})</div>
                                            <div>- {session.lastActive}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <Button className="bg-red-500 text-white" onClick={() => setConfirming(true)}>
                            Log Out All Devices
                        </Button>
                        {confirming ? (
                            <ConfirmPassModal
                                confirming={true}
                                setConfirming={setConfirming}
                                onConfirm={() => logOutAll()}
                                password={password}
                                setPassword={setPassword}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowserSessions
