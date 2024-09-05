import React, { useEffect, useState, Fragment, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FormEventHandler } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { getUrlFile } from '@/util/file';
import { IoMdArrowRoundBack } from 'react-icons/io';
import SearchableSelect from '@/Components/SearchableSelect';
import { FaRegSave } from 'react-icons/fa';
import { RiDraftLine } from 'react-icons/ri';
import { FaRegTrashAlt } from 'react-icons/fa';

const CreateTaskForm = () => {
  const { users } = usePage().props;
  const [images, setImages] = useState<any>([]);
  const form = useRef(null);

  const { data, setData, post, processing, errors, reset } = useForm<any>({
    title: null,
    description: null,
  });

  useEffect(() => {
    setData({ title: '', description: '', images: [], assignTo: '', isPublish: false });
  }, []);

  useEffect(() => {
    setData({ ...data, images });
  }, [images]);

  const publish = () => {
    setData('isPublish', true);
  };

  const saveAsDraft = () => {
    setData('isPublish', false);
  };

  const removeImage = (key: number) => {
    setData({ ...data, images: images.splice(key, 1) });
  };

  const submit: FormEventHandler = event => {
    event.preventDefault();

    console.log(data);

    post(route('task.store'));
  };

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files: any = event.target.files;

    if (files) setImages([...images, files[0]]);
  }

  return (
    <form
      ref={form}
      onSubmit={submit}
      className="w-1/2 bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-4 justify-self-center"
    >
      <div>
        <InputLabel htmlFor="title" value="Title" />
        <TextInput
          id="title"
          type="text"
          name="title"
          value={data.title}
          onChange={event => setData('title', event.target.value)}
          className="mt-1 block w-full"
          placeholder="Title"
        />
        <InputError message={errors.title} className="mt-2" />
      </div>
      <div>
        <InputLabel htmlFor="title" value="Description" />
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
        <InputLabel htmlFor="assignTo" value="Assign to" />
        <SearchableSelect options={users} onChange={(data: any) => setData('assignTo', data.value)} />
        <InputError message={errors.assignTo} className="mt-2" />
      </div>
      <div>
        <>
          <div className="grid grid-cols-3 gap-2 grid-flow-row-dense">
            {images.map((item: File, key: number) => (
              <div className="relative group" key={key} onClick={() => removeImage(key)}>
                <img
                  className="w-full max-h-40 border border-2 border-slate-900 group-hover:opacity-50"
                  src={getUrlFile(item)}
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FaRegTrashAlt className="text-2xl hidden group-hover:block text-red-900" />
                </span>
              </div>
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
      <div className="justify-self-end flex gap-x-2">
        <PrimaryButton disabled={processing} onClick={publish}>
          <FaRegSave className="mr-2 mb-1" /> Published
        </PrimaryButton>
        <SecondaryButton type="submit" disabled={processing} onClick={saveAsDraft}>
          <RiDraftLine className="mr-2" /> Save as draft
        </SecondaryButton>
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
