import React, { useEffect, useState, Fragment } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatTime } from '@/util/date';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Show({ auth }: PageProps) {
  const { task }: any = usePage().props;

  useEffect(() => {
    console.log(task);
  }, []);

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
                  <td>{task.status}</td>
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
            <div className="grid grid-cols-3 grid-flow-row-dense">
              <p>
                <strong>Images:</strong>
              </p>
              {task.images.map((item: any, key: number) => (
                <Fragment key={key}>
                  <img src={item} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
