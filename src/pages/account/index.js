import React, {useEffect, useState} from 'react'
import withAuth from '@components/withAuth'
import Layout from '@components/layout'
import api from '@/util/api'
import DisableTwoFA from '@components/disable-two-fa'
import EnableTwoFA from '@components/enable-two-fa'
import ProfileInfo from '@components/profile-info'
import PasswordInfo from '@components/password-info'
import BrowserSessions from '@components/browser-sessions'

const AccountPage = () => {
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false)
    const [user, setUser]                                 = useState(false)
    const enableTwoFA                                     = () => setTwoFactorAuthEnabled(true)
    const disableTwoFA                                    = () => setTwoFactorAuthEnabled(false)

    useEffect(() => {
        api().get('/me').then(result => {
            setUser(result.data.data)
            setTwoFactorAuthEnabled(!! result.data?.data?.has2FA)
        })
    }, [])

    return (
        <Layout title="Account Settings">
            <div className="mt-10 sm:mt-0">
                <ProfileInfo user={user} />
            </div>
            <div className="mt-10">
                <PasswordInfo />
            </div>
            <div className="mt-10">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Two-Factor Authentication
                            </h3>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                            <span className="ml-1 font-bold">
                                                {twoFactorAuthEnabled
                                                    ? <span className="text-green-500">Enabled</span>
                                                    : <span className="text-red-500">Disabled</span>}
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {twoFactorAuthEnabled
                                    ? <DisableTwoFA onSuccess={disableTwoFA} />
                                    : <EnableTwoFA onSuccess={enableTwoFA} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <BrowserSessions />
            </div>
        </Layout>
    )
}

export default withAuth(AccountPage)
