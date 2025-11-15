import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTemplateVisibility as updateTemplateVisibilityApi } from "@/services/apiTemplates";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const useUpdateTemplateVisibility = () => {
    const queryClient = useQueryClient();
    const { accessToken } = useAuth();

    const { mutate: updateTemplateVisibility, isPending: isUpdatingVisibility } = useMutation({
        mutationFn: ({ templateId, isPublic }) => 
            updateTemplateVisibilityApi({ accessToken, templateId, isPublic }),
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries(["all-templates"]);
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update template visibility');
        }
    });

    return { updateTemplateVisibility, isUpdatingVisibility };
};

export default useUpdateTemplateVisibility;
