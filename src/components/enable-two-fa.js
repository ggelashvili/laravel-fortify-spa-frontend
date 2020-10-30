import React, {useState} from 'react'
import Button from '@components/button'
import Modal from '@components/modal'
import ConfirmPass from '@components/confirm-pass'
import api from '@/util/api'

const EnableTwoFa = ({onSuccess}) => {
    const [confirming, setConfirming]       = useState(false)
    const [twoFAEnabled, setTwoFAEnabled]   = useState(false)
    const [qrCode, setQrCode]               = useState('')
    const [recoveryCodes, setRecoveryCodes] = useState([])

    const enable = () => {
        api().post('/user/two-factor-authentication').then(() => {
            api().get('/user/two-factor-qr-code').then(({data}) => {
                setQrCode(data.svg)
            })

            api().get('/user/two-factor-recovery-codes').then(({data}) => {
                setRecoveryCodes(data)
            })

            setConfirming(false)
            setTwoFAEnabled(true)
        }).catch(({status}) => {
            if (status === 423) {
                setConfirming(true)
            }
        })
    }

    return (
        <div>
            <Button className="bg-green-400 text-white" onClick={enable}>Enable</Button>
            <Modal isOpen={twoFAEnabled}>
                <div>
                    {qrCode && <span dangerouslySetInnerHTML={{__html: qrCode}} />}
                </div>
                <div className="mt-5">
                    <h3 className="font-bold text-lg mb-2">Recovery Codes</h3>
                    <div className="gap-2">
                        {recoveryCodes.map(recoveryCode => <div key={recoveryCode}>{recoveryCode}</div>)}
                    </div>
                </div>
                <div className="flex pt-10 mx-auto">
                    <Button onClick={() => {
                        // close modal
                        setTwoFAEnabled(false)

                        // call success
                        onSuccess()
                    }}>Close</Button>
                </div>
            </Modal>
            {confirming ? (
                <ConfirmPass
                    confirming={true}
                    setConfirming={setConfirming}
                    onSuccess={enable}
                    onFail={() => alert('Failed to confirm password')}
                />
            ) : null}
        </div>
    )
}

export default EnableTwoFa
