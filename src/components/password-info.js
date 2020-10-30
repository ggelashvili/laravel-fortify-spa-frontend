import React, {useState} from 'react'
import Button from '@components/button'
import api from '@/util/api'

const PasswordInfo = () => {
    const [fields, setFields] = useState({current_password: '', password: '', password_confirmation: ''})
    const updateFields        = e => {
        e.persist()

        setFields(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const updatePassword = () => {
        api().put('/user/password', fields).then(() => {
            alert('Password has been updated')
        }).catch(({errors}) => {
            alert(errors[0])
        })
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Password
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="currentPassword"
                                       className="block text-sm font-medium leading-5 text-gray-700">
                                    Current Password
                                </label>
                                <input id="currentPassword"
                                       name="current_password"
                                       type="password"
                                       value={fields.current_password}
                                       onChange={updateFields}
                                       className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="currentPassword"
                                       className="block text-sm font-medium leading-5 text-gray-700">
                                    New Password
                                </label>
                                <input id="password"
                                       name="password"
                                       type="password"
                                       value={fields.password}
                                       onChange={updateFields}
                                       className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="passwordConfirmation"
                                       className="block text-sm font-medium leading-5 text-gray-700">
                                    Confirm New Password
                                </label>
                                <input id="passwordConfirmation"
                                       name="password_confirmation"
                                       type="password"
                                       value={fields.password_confirmation}
                                       onChange={updateFields}
                                       className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <Button className="bg-indigo-500 text-white" onClick={updatePassword}>Update Password</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordInfo
