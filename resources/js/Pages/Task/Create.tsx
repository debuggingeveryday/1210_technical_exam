import React, { useEffect, useState, Fragment } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { getUrlFile } from '@/util/file';
import { IoMdArrowRoundBack } from 'react-icons/io';

const CreateTaskForm = () => {
  const [images, setImages] = useState<any>([]);

  const { data, setData, post, processing, errors, reset } = useForm<any>({
    title: null,
    description: null,
    images: null,
  });

  useEffect(() => {
    setData({ title: '', description: '', images: [] });
  }, []);

  useEffect(() => {
    setData({ ...data, images });
  }, [images]);

  const submit: FormEventHandler = event => {
    event.preventDefault();

    post(route('task.store'));
  };

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files: any = event.target.files;

    if (files) {
      const reader: any = new FileReader();

      if (reader && files[0]) {
        reader.readAsText(files[0], 'UTF-8');
        reader.onload = (event: any) => event.target.result;
        reader.onerror = (event: any) => console.log('Error', event);

        setImages([...images, files[0]]);
      }
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-1/2 bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-4 justify-self-center"
    >
      <div>
        <InputLabel htmlFor="filterByTitle" value="Title" />
        <TextInput
          id="filterByTitle"
          type="text"
          name="filterByTitle"
          value={data.title}
          onChange={event => setData('title', event.target.value)}
          className="mt-1 block w-full"
          placeholder="Title"
        />
        <InputError message={errors.title} className="mt-2" />
      </div>
      <div>
        <InputLabel htmlFor="description" value="Description" />
        <TextAreaInput
          id="description"
          name="description"
          className="mt-1 block w-full"
          autoComplete="description"
          placeholder="Description"
          value={data.description}
          onChange={event => setData('description', event.target.value)}
          isFocused={true}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>
      <div>
        <>
          <div className="grid grid-cols-3 gap-2 grid-flow-row-dense">
            {images.map((item: File, key: number) => (
              <Fragment key={key}>
                <img className="w-full max-h-40 border border-2 border-slate-900" src={getUrlFile(item)} />
              </Fragment>
            ))}
          </div>
          <label
            htmlFor="uploadFile1"
            className="mt-5 flex bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 font-semibold text-xs uppercase outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
          >
            <IoMdCloudUpload className="mr-2 fill-white inline" />
            Add image
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              id="uploadFile1"
              onChange={(event: any) => onFileUpload(event)}
              className="hidden"
            />
          </label>
        </>
      </div>
      <div className="justify-self-end">
        <PrimaryButton className="ms-4" disabled={processing}>
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
};

export default function Create({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task Create</h2>}
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1">
          <Link href={route('task.index')} className="flex">
            <IoMdArrowRoundBack className="mt-1" /> <span>Back</span>
          </Link>
          <CreateTaskForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
