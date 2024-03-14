import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';
import RealTimeEditor from '../RealTimeEditor';
import Select from '../Select';
import appWriteService from '../../appwrite/db-storage-config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Models } from 'appwrite';

interface DataProps {
  title: string;
  slug: string;
  content: string;
  status: string;
  featuredImage: File | null;
}

type PostProps = {
  post?: Models.Document;
};

export default function PostForm({ post }: PostProps) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<DataProps>({
      defaultValues: {
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'true',
        featuredImage: null,
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data: DataProps) => {
    if (post) {
      const file = data.featuredImage
        ? await appWriteService.uploadFile(data.featuredImage)
        : null;

      if (file) {
        appWriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : '',
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appWriteService.uploadFile(data.featuredImage!);
      if (file) {
        const fileId = file.$id;
        const dbPost = await appWriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData?.$id as string,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string | undefined) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title)!, {
          shouldValidate: true,
        });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value)!, {
              shouldValidate: true,
            });
          }}
        />
        <RealTimeEditor
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/svg"
          {...register('featuredImage', { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appWriteService.getFilePreview(post.featuredImage).href}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['true', 'false']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-400' : ''}
          className="w-full"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
