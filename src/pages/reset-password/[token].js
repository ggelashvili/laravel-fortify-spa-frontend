import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import api from '@/util/api'
import Link from 'next/link'

const ResetPasswordPage = () => {
    const router                    = useRouter()
    const {token, email}            = router.query
    const [formInput, setFormInput] = useState({email: '', password: '', password_confirmation: ''})

    const updateFormInput = e => {
        e.persist()

        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const update = () => {
        api(true).get('/sanctum/csrf-cookie').then(() => {
            api().post('/reset-password', {...formInput, token}).then(() => {
                alert('Password has been reset')

                router.push('/')
            }).catch(({errors}) => {
                alert(errors[0])
            })
        })
    }

    useEffect(() => {
        if (email) {
            setFormInput(prev => ({...prev, email}))
        }
    }, [email])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <img className="mx-auto h-12 w-auto"
                         src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or {' '}
                        <Link href="/register">
                            <a
                                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Create New Account
                            </a>
                        </Link>
                    </p>
                </div>
                <div className="mt-6">
                    <div className="rounded-md shadow-sm">
                        <div className="-mt-px">
                            <input aria-label="Email address" name="email" type="email" required
                                   onChange={updateFormInput}
                                   value={formInput.email}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Email address" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Password" name="password" type="password" required
                                   onChange={updateFormInput}
                                   value={formInput.password}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Password" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Confirm Password" name="password_confirmation" type="password" required
                                   onChange={updateFormInput}
                                   value={formInput.password_confirmation}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="button"
                                onClick={update}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage
