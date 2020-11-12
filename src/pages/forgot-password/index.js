import React, {useState} from 'react'
import api from '@/util/api'
import Link from 'next/link'

const ForgotPasswordPage = () => {
    const [email, setEmail]         = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const reset = () => {
        api(true).get('/sanctum/csrf-cookie').then(() => {
            api().post('/forgot-password', {email}).then(() => {
                setEmailSent(true)
            }).catch(({errors}) => {
                alert(errors[0])

                setEmailSent(false)
            })
        })
    }

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
                {emailSent ? (
                    <div className="mt-3 bg-green-200 text-green-700 font-semibold p-3 rounded-lg ">
                        Instructions to reset your password have been sent to {email}
                    </div>
                ) : (
                    <>
                        <div className="mt-5">
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input aria-label="Email address" name="email" type="email" required
                                           onChange={e => setEmail(e.target.value)}
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                           placeholder="Email address" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button type="submit"
                                    onClick={reset}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgotPasswordPage
