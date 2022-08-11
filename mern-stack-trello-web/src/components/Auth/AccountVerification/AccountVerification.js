import React, { useEffect, useState } from 'react'
import { useSearchParams ,Navigate } from 'react-router-dom'
import LoadingSpinner from 'components/Common/LoadingSpinner'
import {verifyUserAPI} from 'actions/ApiCall'

function AccountVerification() {
    let [searchParams] = useSearchParams()
    const { email, token } = Object.fromEntries([...searchParams]) // luc trc lấy theo get , còn này lấy nhiều
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (email && token) {
            //gọi api
            verifyUserAPI({email,token}).then(()=>{
                setVerified(true)
            })
        }
    }, [email, token])

    if (!email || !token) {
        return <Navigate to="/404" replace={true} />
    }

    if (!verified) {
        return <LoadingSpinner caption='Verifying...' />
    }

    return (
        <Navigate to={`/signin?verifiedEmail=${email}`} replace={true} />
    )
}

export default AccountVerification