'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';

import { FileUploader } from '@/components/file-uploader';
import { ImageIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface FormImageUploadProps {
  name: string;
  maxFiles?: number;
  maxSize?: number;
}

export function FormImageUpload({
  name,
  maxFiles = 4,
  maxSize = 4 * 1024 * 1024
}: FormImageUploadProps) {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <ImageIcon className='h-5 w-5 text-blue-600' />
          Imágenes del Producto
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='mx-5 gap-6 md:mx-20'>
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFiles={maxFiles}
                    maxSize={maxSize}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
