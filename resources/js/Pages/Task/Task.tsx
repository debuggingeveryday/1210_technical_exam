import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useRef, Fragment } from 'react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import { formatTime } from '@/util/date';
import TextInput from '@/Components/TextInput';
import { FaEye } from 'react-icons/fa';

export default function Task({ auth }: PageProps) {
  const { response }: any = usePage().props;
  // const parentCheckBox = useRef(null);
  const childrenCheckBox = useRef([]);

  const { data, setData, post, put, processing, errors, get }: any = useForm({
    filterByTitle: null,
    filterByCreatedUser: null,
    filterByAssignedUser: null,
    limit: null,
    sortBy: null,
    orderBy: null,
    page: null,
  });

  useEffect(() => {
    setData({
      ...data,
      filterByTitle: '',
      filterByCreatedUser: '',
      filterByAssignedUser: '',
      limit: 5,
      sortBy: 'created_at',
      orderBy: 'ASC',
      page: 1,
    });
  }, []);

  useEffect(() => {
    const fetchTaskList = async () => {
      await get(route('task.index'), { preserveState: true });
    };

    fetchTaskList();
  }, [data]);

  const sampleCheck = (event: any) => {
    console.log(childrenCheckBox);
  };

  const columns = [
    {
      column: '_index',
      name: '#',
    },
    {
      column: 'title',
      name: 'Title',
    },
    {
      column: '_custom',
      component: <p>Descriptions</p>,
      childComponent: (value: any, index: number) => (
        <Fragment key={index}>
          <a onClick={() => router.get(route('task.show', 1))} className="group flex">
            <FaEye className="group-hover:underline mt-1 mr-1" />
            <p className="group-hover:underline">View details</p>
          </a>
        </Fragment>
      ),
      sort: false,
    },
    {
      column: 'status',
      name: 'Status',
    },
    {
      column: 'is_published',
      name: 'Published',
      mutate: (value: boolean) => (value ? 'Yes' : 'No'),
    },
    {
      column: 'created_by_user_id',
      name: 'Created by',
      mutate: (value: any) => value.name,
    },
    {
      column: 'assigned_by_user_id',
      name: 'Assigned by',
      mutate: (value: any) => value.name,
    },
    {
      column: 'created_at',
      name: 'Created at',
      mutate: (value: any) => formatTime(value),
    },
  ];

  function pageAction({ label, url }: any) {
    if (url === null || label === '...') return false;
    if (['&laquo; Previous', 'Next &raquo;'].includes(label)) {
      const page = url.split('=').splice('-1').toString();
      setData('page', +page);
    } else {
      setData('page', +label);
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task List</h2>}
    >
      <Head title="Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid space-y-5">
          <PrimaryButton onClick={() => router.get(route('task.create'))} className="place-self-start">
            Create
          </PrimaryButton>
          <div className="grid grid-cols-3 gap-x-6">
            <TextInput
              id="filterByTitle"
              type="text"
              name="filterByTitle"
              value={data.filterByTitle}
              className="mt-1 block w-full"
              placeholder="Search title"
              onChange={event => setData('filterByTitle', event.target.value)}
            />
            <TextInput
              id="filterByCreatedUser"
              type="text"
              name="filterByCreatedUser"
              className="mt-1 block w-full"
              placeholder="Search created by user"
              onChange={event => setData('filterByCreatedUser', event.target.value)}
            />
            <TextInput
              id="filterByAssignedUser"
              type="text"
              name="filterByAssignedUser"
              className="mt-1 block w-full"
              placeholder="Search assigned by user"
              onChange={event => setData('filterByAssignedUser', event.target.value)}
            />
          </div>
          <DataTable
            data={response.data}
            columns={columns}
            sortColumn={(sortBy: any, orderBy: any) => setData({ ...data, orderBy: orderBy, sortBy: sortBy })}
            totalPages={response.total}
            fromPage={response.from}
            toPage={response.to}
            links={response.links}
            pageAction={(value: any) => pageAction(value)}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
