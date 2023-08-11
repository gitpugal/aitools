import { useSession } from 'next-auth/react'
import React from 'react'

const profile = () => {
    const session = useSession();
  return (
    <div style={{height:"100vh", width: "100vw"}}>
        Hi {session?.data?.user?.name}
    </div>
  )
}

export default profile