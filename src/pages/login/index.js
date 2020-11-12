import React, {useState} from 'react'
import api from '@/util/api'
import {logIn} from '@/util/auth'
import TwoFALogin from '@components/two-fa-login'
import Link from 'next/link'

const LogInPage = () => {
    const [formInput, setFormInput] = useState({email: '', password: ''})
    const [twoFA, setTwoFA]         = useState(false)

    const updateFormInput = e => {
        e.persist()

        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const signIn = e => {
        e.preventDefault()

        api(true).get('/sanctum/csrf-cookie').then(() => {
            api().post('/login', formInput).then(({data}) => {
                if (data?.two_factor === true) {
                    setTwoFA(true)
                } else {
                    logIn()
                }
            }).catch(({errors}) => {
                alert(errors[0]);
            })
        })
    }

    const handleTwoFAFailure = () => {
        setTwoFA(false)

        alert('You entered the wrong code')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <img className="mx-auto h-12 w-auto"
                         src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Sign in to your account
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
                {twoFA ? <TwoFALogin onVerify={() => logIn()} onFail={handleTwoFAFailure} /> : (
                    <form className="mt-8" action="#" method="POST">
                        <div className="rounded-md shadow-sm">
                            <div>
                                <input aria-label="Email address" name="email" type="email" required
                                       onChange={updateFormInput}
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                       placeholder="Email address" />
                            </div>
                            <div className="-mt-px">
                                <input aria-label="Password" name="password" type="password" required
                                       onChange={updateFormInput}
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                       placeholder="Password" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit"
                                    onClick={signIn}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                                        fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                  </span>
                                Sign In
                            </button>
                        </div>

                        <div className="mt-2 text-center">
                            <Link href="/forgot-password">
                                <a
                                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    Forgot Password
                                </a>
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default LogInPage
