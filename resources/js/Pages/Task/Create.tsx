import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm} from '@inertiajs/react';
import { PageProps } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react'

const CreateTaskForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (
        <form onSubmit={submit} className='m-4'>
            <InputLabel htmlFor="title" className='text-lg' value="Title" />
            <TextInput
                id="title"
                type="title"
                name="title"
                value={data.title}
                className="mt-1 text-lg block w-full"
                autoComplete="title"
                isFocused={true}
                onChange={(e) => setData('title', e.target.value)}
            />
             <InputLabel htmlFor="description" className='text-lg' value="Description" />
            <TextAreaInput
                id="description"
                name="description"
                value={data.title}
                className="mt-1 text-lg block w-full"
                autoComplete="description"
                isFocused={true}
                onChange={(e) => setData('description', e.target.value)}
            />

            <InputError message={errors.description} className="mt-2" />

            <PrimaryButton className="ms-4" disabled={processing}>
                Submit
            </PrimaryButton>
        </form>
    )
}

export default function Create({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task Create</h2>}
        >
            <Head title="Create Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <CreateTaskForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
