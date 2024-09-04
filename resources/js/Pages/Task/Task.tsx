import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, Fragment } from 'react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import { formatTime } from '@/util/date';
import TextInput from '@/Components/TextInput';
import { FaEye } from 'react-icons/fa';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import { TODO, IN_PROGRESS, DONE, PUBLISHED, DRAFT } from '@/constants/constants';
import { trimString } from '@/util/string';
import SearchableSelect from '@/Components/SearchableSelect';

export default function Task({ auth }: PageProps) {
  const { response, users }: any = usePage().props;
  const STATUSES = [TODO, IN_PROGRESS, DONE];
  const PUBLISH = [PUBLISHED, DRAFT];

  const { data, setData, post, put, processing, errors, get }: any = useForm({
    filterByTitle: null,
    filterByCreatedUser: null,
    filterByAssignedUser: null,
    status: null,
    publish: null,
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
      status: '',
      publish: '',
      limit: 5,
      sortBy: 'created_at',
      orderBy: 'ASC',
      page: 1,
    });
  }, []);

  const limit = [5, 10, 20, 50];

  useEffect(() => {
    const fetchTaskList = async () => {
      await get(route('task.index'), { preserveState: true });
    };

    fetchTaskList();
  }, [data]);

  const viewDetails = (value: any) => {
    if (value.is_published === 1) router.get(route('task.show', value.id));
    if (value.is_published === 0) router.get(route('task.edit', value.id));
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
          <a onClick={() => viewDetails(value)} className="group flex">
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
      mutate: (value: string) => {
        let style = '';

        if (value === 'todo') style = 'bg-slate-300 text-slate-900 py-2 px-4 rounded-lg shadow-sm';
        if (value === 'in_progress')
          style = 'bg-yellow-300 text-slate-900 text-slate-900 py-2 px-4 rounded-lg shadow-sm';
        if (value === 'done') style = 'bg-slate-900 text-white py-2 px-4 rounded-lg shadow-sm';

        return (
          <div className="capitalize">
            <span className={`${style}`}>{trimString(value)}</span>
          </div>
        );
      },
    },
    {
      column: 'is_published',
      name: 'Published',
      mutate: (value: boolean) => <div className="capitalize">{value ? PUBLISHED : DRAFT}</div>,
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
            Create Task
          </PrimaryButton>
          <div className="grid gap-y-3 gap-x-6 grid-cols-2 grid-flow-row-dense">
            <div>
              <InputLabel htmlFor="filterByTitle" value="Title" />
              <TextInput
                id="filterByTitle"
                type="text"
                name="filterByTitle"
                value={data.filterByTitle}
                className="mt-1 block w-full"
                placeholder="Search title"
                onChange={event => setData('filterByTitle', event.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="assignTo" value="Assign to" />
              <SearchableSelect options={users} onChange={(value: any) => setData('filterByAssignedUser', value.id)} />
            </div>
            <div>
              <InputLabel htmlFor="createdBy" value="Created by" />
              <SearchableSelect options={users} onChange={(value: any) => setData('filterByCreatedUser', value.id)} />
            </div>
            <div className="grid grid-cols-3">
              <div>
                <InputLabel htmlFor="status" value="Status" />
                <Select
                  id="status"
                  options={STATUSES}
                  hasAllOption={true}
                  className="capitalize mt-1"
                  mutate={(value: any) => (
                    <option className="capitalize" label={trimString(value)}>
                      <span>{value}</span>
                    </option>
                  )}
                  onChange={(event: any) => setData('status', event.target.value)}
                />
              </div>
              <div>
                <InputLabel htmlFor="published" value="Published" />
                <Select
                  id="published"
                  options={PUBLISH}
                  hasAllOption={true}
                  className="capitalize mt-1"
                  mutate={(value: any) => (
                    <option className="capitalize" label={trimString(value)}>
                      <span>{value}</span>
                    </option>
                  )}
                  onChange={(event: any) => setData('publish', event.target.value)}
                />
              </div>
              <div className="place-self-end">
                <InputLabel htmlFor="limit" value="Limit" />
                <Select
                  id="limit"
                  options={limit}
                  hasAllOption={false}
                  className="mt-1"
                  mutate={(value: any) => <option label={value}>{value}</option>}
                  onChange={(event: any) => setData('limit', event.target.value)}
                />
              </div>
            </div>
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
