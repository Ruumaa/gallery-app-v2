'use client';

import { uploadeImage } from '@/lib/fetch';
import { headers } from '@/next.config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

const HandleUpload = ({ session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleModal = async (session) => {
    if (!session) {
      return toast.error('You should login first');
    } else {
      setIsOpen(!isOpen);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const image = await data.image[0];
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'galleryApp');

      // ------ POST to cloudinary --------------------
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ID}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const uploadedImage = await uploadResponse.json();
      const imageUrl = await uploadedImage.url;

      // ------- POST to database -----------------
      const userId = await session.user.id;
      const uploadImage = await uploadeImage(userId, imageUrl);
      if (uploadImage?.error) {
        toast.error('Invalid image file');
      } else {
        mutate('/api/images');
        toast.success(`${uploadImage.msg}`);
        setIsOpen(false);
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-auto mr-5">
      <button
        onClick={() => handleModal(session)}
        className="font-medium font-mono hover:text-slate-300"
      >
        Upload
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="bg-base-100 rounded-md p-5 xl:p-8 ">
          <div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2 font-semibold text-xl xl:text-2xl font-mono text-gray-900">
                Upload File
              </label>
              <input
                type="file"
                {...register('image', { required: true })}
                className="file-input file-input-primary text-primary file-input-bordered w-full file-input-xs xl:file-input-sm"
              />
              {errors.image && (
                <p className="text-red-600 text-sm m-px ml-1">
                  Input can&apos;t be empty
                </p>
              )}
              <p
                className="mt-1 ml-1 text-xs xl:text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                Format file: SVG, PNG, JPG
              </p>
              <div className="modal-action">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-sm xl:btn-md hover:bg-slate-900"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-base-100 btn-sm xl:btn-md"
                  onClick={handleModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleUpload;
