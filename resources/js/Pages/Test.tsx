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
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
