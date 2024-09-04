import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AlertBar from '@/Components/AlertBar';

export default function Test({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Test Page</h2>}
    >
      <Head title="Test Page" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1>Test Page</h1>

          <AlertBar />
          <div>
            <div className="relative h-48 w-48 bg-gray-200">
              <img
                src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                alt="image"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
              />
              <i className="fas fa-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-600"></i>
            </div>
          </div>
          <div>
            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute left-0 top-0 h-16 w-16 text-white bg-slate-500">01</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute inset-x-0 top-0 h-16 text-white bg-slate-500">02</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute top-0 right-0 h-16 w-16 text-white bg-slate-500">03</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute inset-y-0 left-0 w-16 text-white bg-slate-500">04</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute inset-0 text-white bg-slate-500">05</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute inset-y-0 right-0 w-16 text-white bg-slate-500">06</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute bottom-0 left-0 h-16 w-16 text-white bg-slate-500">07</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute inset-x-0 bottom-0 h-16 text-white bg-slate-500">08</div>
            </div>

            <div className="relative h-32 w-32 bg-slate-900">
              <div className="absolute bottom-0 right-0 h-16 w-16 text-white bg-slate-500">09</div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
