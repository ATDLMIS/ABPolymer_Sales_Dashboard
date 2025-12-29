'use client'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Approval from '@/components/moneyApproval/Approval'
import Axios from '@/utils/axios';
import { useSession } from 'next-auth/react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
     const { data: session } = useSession();
     const userID = session?.user?.id;
  return (
    <Approval params={params} userID={userID} />
  )
}

export default page 