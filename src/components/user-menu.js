import React from 'react'
import {Menu, Transition} from '@headlessui/react'
import {logOut} from '@/util/auth'
import api from '@/util/api'
import Link from 'next/link'

const UserMenu = () => {
    return (
        <div className="relative inline-block text-left">
            <Menu>
                {({open}) => (
                    <>
                        <span className="rounded-md shadow-sm">
                            <Menu.Button className="text-white transition duration-150 ease-in-out focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Menu.Button>
                        </span>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                            >
                                <div className="py-1">
                                    <Link href="/account">
                                        <a>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <span
                                                        className={`${
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                        } cursor-pointer flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                    >
                                                        Account Settings
                                                    </span>
                                                )}
                                            </Menu.Item>
                                        </a>
                                    </Link>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#"
                                                onClick={() => api().post('/logout').then(() => logOut())}
                                                className={`${
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                            >
                                                Sign Out
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default UserMenu
