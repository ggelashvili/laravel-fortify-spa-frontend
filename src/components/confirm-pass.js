import React, {useState} from 'react'
import Input from '@components/input'
import Button from '@components/button'
import Modal from '@components/modal'
import api from '@/util/api'

const ConfirmPass = ({confirming, setConfirming, onFail, onSuccess}) => {
    const [password, setPassword] = useState('')

    const confirm = () => {
        api().post('/user/confirm-password', {password}).then(() => {
            onSuccess()
        }).catch(({error, status}) => {
            console.log(error, status)

            onFail()
        })
    }

    return (
        <Modal isOpen={confirming}>
            <div>
                Confirm Password: {" "}
                <Input type="password" name="password" value={password}
                       onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-between pt-10">
                <Button onClick={() => setConfirming(false)}>Cancel</Button>
                <Button className="bg-green-400 text-white" onClick={confirm}>Confirm</Button>
            </div>
        </Modal>
    )
}

export default ConfirmPass
