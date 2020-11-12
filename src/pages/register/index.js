import React, {useState} from 'react'
import Link from 'next/link'
import api from '@/util/api'
import {logIn} from '@/util/auth'

const RegisterPage = () => {
    const [formInput, setFormInput] = useState({name: '', email: '', password: '', password_confirmation: ''})

    const updateFormInput = e => {
        e.persist()

        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const register = e => {
        e.preventDefault()

        api(true).get('/sanctum/csrf-cookie').then(() => {
            api().post('/register', formInput).then(() => {
                logIn()
            }).catch(({errors}) => {
                console.log(errors)

                alert(errors[0])
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
                        Create Your New Account
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or {' '}
                        <Link href="/login">
                            <a
                                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Sign In
                            </a>
                        </Link>
                    </p>
                </div>
                <form className="mt-8" action="#" method="POST">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="Name" name="name" type="text" required
                                   onChange={updateFormInput}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Full name" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Email address" name="email" type="email" required
                                   onChange={updateFormInput}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Email address" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Password" name="password" type="password" required
                                   onChange={updateFormInput}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Password" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Confirm Password" name="password_confirmation" type="password" required
                                   onChange={updateFormInput}
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Password" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit"
                                onClick={register}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
