import React, {useState} from 'react'
import Button from '@components/button'
import ConfirmPass from '@components/confirm-pass'
import api from '@/util/api'

const DisableTwoFA = ({onSuccess}) => {
    const [confirming, setConfirming] = useState(false)

    const disable = () => {
        api().delete('/user/two-factor-authentication').then(() => {
            onSuccess()
        }).catch(({status}) => {
            if (status === 423) {
                setConfirming(true)
            }
        })
    }

    return (
        <div>
            <Button className="bg-red-400 text-white" onClick={disable}>Disable</Button>
            {confirming ? (
                <ConfirmPass
                    confirming={true}
                    setConfirming={setConfirming}
                    onFail={() => alert('Failed to confirm password')}
                    onSuccess={disable}
                />
            ) : null}
        </div>
    )
}

export default DisableTwoFA
