import { useCallback, useEffect, useState } from 'react';
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
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hourglass } from 'react-loader-spinner';

type PostProps = {
  post?: Models.Document;
};

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'title must be atleast 5 characters.' })
    .max(20, { message: 'title must be atmost 20 characters' }),
  slug: z
    .string()
    .min(5, { message: 'title must be atleast 5 characters.' })
    .max(20, { message: 'title must be atmost 20 characters' }),
  content: z.string(),
  status: z.string(),
  featuredImage: z
    .any()
    .refine((featuredImage) => featuredImage?.length == 1, 'File is required.')
    .refine(
      (featuredImage) => featuredImage[0]?.size <= 3000000,
      `Max file size is 3MB.`
    ),
});

export default function PostForm({ post }: PostProps) {
  console.log('Post Form:');
  console.log(post);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const slugTransform = useCallback((value: string | undefined) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      slug: slugTransform(post?.title) || '',
      content: post?.content || '',
      status: post?.status || 'true',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    if (post) {
      const file = data.featuredImage[0]
        ? await appWriteService.uploadFile(data.featuredImage[0])
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
      console.log(data.featuredImage[0]);
      console.log(data);
      const file = await appWriteService.uploadFile(data.featuredImage[0]);
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
    setSubmitting(false);
  };

  useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title)!, {
          shouldValidate: true,
        });
      }
    });
  });

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2 text-left">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value)!, {
              shouldValidate: true,
            });
          }}
        />
        {errors.slug && (
          <p className="text-red-500 text-xs italic">{errors.slug.message}</p>
        )}

        <RealTimeEditor
          label="Content"
          name="content"
          control={control}
          defaultValue={post?.content}
        />
        {errors.content && (
          <p className="text-red-500 text-xs italic">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="w-1/3 px-2 text-left">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
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
        {errors.status && (
          <p className="text-red-500 text-xs italic">{errors.status.message}</p>
        )}
        <Button
          type="submit"
          // bgColor={post ? 'bg-apple-800' : ''}
          className="w-full flex items-center justify-center"
        >
          {submitting ? (
            <Hourglass
              visible={true}
              width={'18'}
              height={'18'}
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#c2f0c2', '#f1fcf1']}
            />
          ) : post ? (
            'Update'
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </form>
  );
}
