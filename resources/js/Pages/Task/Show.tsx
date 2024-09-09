import React, { useEffect, useState, Fragment } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatTime } from '@/util/date';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaRegTrashAlt } from 'react-icons/fa';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/PrimaryButton';
import { FaWrench } from 'react-icons/fa';
import { MdOutlineSpeakerNotes } from 'react-icons/md';
import { MdDone } from 'react-icons/md';
import { trimString } from '@/util/string';
import { CAN_DELETE_TASK } from '@/constants/constants';
import { toast } from 'react-toastify';

export default function Show({ auth }: PageProps) {
  const { task }: any = usePage().props;
  const USER_CAN_DELETE_TASK = auth.user.permissions.some(({ name }: any) => name === CAN_DELETE_TASK);

  const updateStatus = (status: string = '') => {
    router.put(
      route('task.update-status', task.id),
      {
        status,
      },
      {
        onSuccess: () => {
          toast.success(`Status update to ${trimString(status)}`);
        },
      }
    );
  };

  const deleteTask = (id: number) => {
    router.delete(route('task.destroy', id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task</h2>}
    >
      <Head title="Task Show" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid">
          <Link href={route('task.index')} className="flex">
            <IoMdArrowRoundBack className="mt-1" /> <span>Back</span>
          </Link>
          <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg place-self-center grid grid-cols-1 gap-y-4">
            <div className="place-self-end">
              {USER_CAN_DELETE_TASK && (
                <button className="text-red-500" type="button" onClick={() => deleteTask(task.id)}>
                  <FaRegTrashAlt className="mt-1" />
                </button>
              )}
            </div>
            <table className="table-auto">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Title:</strong>
                  </td>
                  <td>{task.title}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Description:</strong>
                  </td>
                  <td>{task.description}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td className="capitalize">{trimString(task.status)}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Is published:</strong>
                  </td>
                  <td>{task.is_published}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Created by:</strong>
                  </td>
                  <td>{task.created_by}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Assigned to:</strong>
                  </td>
                  <td>{task.assigned_by}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Date created</strong>
                  </td>
                  <td>{formatTime(task.created_at)}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td>
                    <strong>Date updated</strong>
                  </td>
                  <td>{formatTime(task.updated_at)}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>
                <strong>Images:</strong>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 grid-flow-row-dense">
              {task.images.map((item: any, key: number) => (
                <Fragment key={key}>
                  <img src={item} />
                </Fragment>
              ))}
            </div>
            <div className="justify-self-end flex gap-x-2">
              <PrimaryButton className="bg-slate-300 text-slate-900" onClick={() => updateStatus('todo')}>
                <MdOutlineSpeakerNotes className="mr-2 mb-1" /> Todo
              </PrimaryButton>
              <SecondaryButton className="bg-yellow-300 text-slate-900" onClick={() => updateStatus('in_progress')}>
                <FaWrench className="mr-2" /> In Progress
              </SecondaryButton>
              <SecondaryButton type="submit" onClick={() => updateStatus('done')}>
                <MdDone className="mr-2" /> Done
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
