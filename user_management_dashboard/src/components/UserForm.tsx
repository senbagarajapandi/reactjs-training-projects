import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, UserFormProps} from './interfaces';

const UserForm: React.FC<UserFormProps> = ({ onSubmit, existingUser }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('*Name is required'),
    email: Yup.string().email('*Invalid email format').required('*Email is required'),
    role: Yup.string().required('*Role is required'),
  });

  const { control, handleSubmit, formState: { errors }, reset } = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: existingUser || { name:'', email:'', role:'' }
  });

  useEffect(() => {
    if (existingUser) {
      reset(existingUser);
    }
  }, [existingUser, reset]);

  const handleFormSubmit = (data: User) => {
    onSubmit(data);
    reset({name:'', email:'', role:''})
  }

  return (
    <div className='left'>
      <h2>{existingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} placeholder='Enter Your Name' type='text'/>}
          />
          {errors.name && <p className='error'>{errors.name.message}</p>}
        </div>

        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} placeholder='Enter Your Email' type='text'/>}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>

        <div>
          <Controller
            name="role"
            control={control}
            render={({ field }) => <input {...field} placeholder='Enter Your Role' type='text'/>}
          />
          {errors.role && <p className='error'>{errors.role.message}</p>}
        </div>

        <button type="submit">{existingUser ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;