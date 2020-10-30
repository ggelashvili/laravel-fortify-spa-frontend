import React, {useState} from 'react'
import api from '@/util/api'

const TwoFALogin = ({onVerify, onFail}) => {
    const [code, setCode]                       = useState('')
    const [useRecoveryCode, setUseRecoveryCode] = useState('')

    const verify = () => {
        let data = {}

        if (useRecoveryCode) {
            data.recovery_code = code
        } else {
            data.code = code
        }

        api().post('/two-factor-challenge', data).then(() => {
            onVerify()
        }).catch(() => {
            onFail()
        })
    }

    return (
        <div className="mt-8">
            <div>
                <div className="rounded-md shadow-sm">
                    <input name="code" type="text" required
                           onChange={e => setCode(e.target.value)}
                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                           placeholder={`Enter ${useRecoveryCode ? 'Recovery' : ''} Code`} />
                </div>
                <div className="text-center mt-2">
                    <label>
                        <input className="mr-1" type="checkbox" onChange={e => setUseRecoveryCode(e.target.checked)} />
                        Use Recovery Code
                    </label>
                </div>
            </div>

            <div className="mt-6">
                <button type="button"
                        onClick={verify}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Verify
                </button>
            </div>
        </div>
    )
}

export default TwoFALogin
