import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';
import useCurrentUser from '@/hooks/useCurrentUser';
import useAuth from '@/hooks/useAuth';

export default function UserDataProvider({ children }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();
    const { user, isLoading } = useCurrentUser();

    useEffect(() => {
        if (isAuthenticated && user && !isLoading) {
            // Set user data in Redux store
            dispatch(setUser({
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                image: user.image,
                isRestricted: user.isRestricted,
            }));
        }
    }, [isAuthenticated, user, isLoading, dispatch]);

    return children;
}