import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getUserApi,
  loginApi,
  logoutApi,
  signupApi,
} from '../services/userApi';
import toast from 'react-hot-toast';

const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isFetching } = useMutation({
    mutationKey: ['user'],
    retry: 0,
    mutationFn: obj => signupApi(obj),

    onSuccess: () => {
      toast.success('You successfully registered!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      toast.error(error.response.data.err);
    },
  });

  return { mutate, data, error, isPending, isFetching };
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { data, isFetching, isPending, error, mutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: obj => loginApi(obj),

    onSuccess: () => {
      toast.success('You have loged in!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      toast.error(error.response.data.err);
    },
  });

  return { data, isPending, isFetching, error, mutate };
};

const useGetUserQuery = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { data, isPending, isFetching, error };
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isFetching, error, mutate } = useMutation({
    mutationFn: logoutApi,
    retry: 0,
    enabled: false,
    onSuccess() {
      toast.success('logged out!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { data, isPending, isFetching, error, mutate };
};

export {
  useSignupMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
};
