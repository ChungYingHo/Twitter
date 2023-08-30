import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkPermission, checkAdminPermission } from "../api/Permission"

const useAuthValitate = (redirectTo)=>{
    const navigate = useNavigate()
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('UserToken');
        if (!authToken) {
            navigate(redirectTo)
        }
        const result = await checkPermission(authToken);
        if (!result) {
            navigate(redirectTo);
        }
        };
        checkTokenIsValid();
    }, [navigate])
}

const useAdminAuthValitate = (redirectTo)=>{
    const navigate = useNavigate()
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('AdminToken');
        if (!authToken) {
            if(redirectTo === '/admin_tweets'){
                return
            }else{
                navigate(redirectTo);
            }
        }
        const result = await checkAdminPermission(authToken);
        if (!result) {
            navigate(redirectTo);
        }
        };
        checkTokenIsValid();
    }, [navigate])
}

// 登入用
const useLoginAuthValitate = (redirectTo)=>{
    const navigate = useNavigate()
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('UserToken');
        if (!authToken) {
            return
        }
        const result = await checkPermission(authToken);
        if (result) {
            navigate(redirectTo);
        }
        };
        checkTokenIsValid();
    }, [navigate])
}

const useAdminLoginAuthValitate = (redirectTo)=>{
    const navigate = useNavigate()
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('AdminToken');
        if (!authToken) {
            return
        }
        const result = await checkAdminPermission(authToken);
        if (result) {
            navigate(redirectTo);
        }
        };
        checkTokenIsValid();
    }, [navigate])
}


export {useAuthValitate, useAdminAuthValitate, useLoginAuthValitate, useAdminLoginAuthValitate}