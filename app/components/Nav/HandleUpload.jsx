'use client';

import { postCloudinary, uploadeImage } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const HandleUpload = ({ session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleModal = async (session) => {
    if (!session) {
      return toast.error('You should login first');
    } else {
      setIsOpen((prev) => {
        if (!prev) reset();
        return !prev;
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const image = await data.image[0];

      // Validation
      const maxSize = 10 * 1024 * 1024;
      const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(image.type)) {
        setIsLoading(false);
        return toast.error('Only SVG, PNG, and JPG files are allowed.');
      }
      if (image.size > maxSize) {
        setIsLoading(false);
        return toast.error('File size exceeds the 10MB limit.');
      }

      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'galleryApp');

      // Post to cloudinary
      const cloudinaryImage = await postCloudinary(formData);
      const imageUrl = await cloudinaryImage.url;

      // Post to database
      const userId = await session.user.id;
      const postImage = await uploadeImage(userId, imageUrl);

      toast.success(`${postImage.msg}`);
      setIsOpen(false);
      router.push('/');
      router.refresh();
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
                Format file: SVG, PNG, JPG and max 10MB
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
