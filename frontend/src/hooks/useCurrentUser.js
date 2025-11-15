import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from '@/services/apiAuth';

const useCurrentUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        enabled: !!localStorage.getItem('accessToken'),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { user: data?.userData, isLoading, error };
};

export default useCurrentUser;